import crypto from "node:crypto";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export const demoDurations = { "15m": 900, "30m": 1800, "1h": 3600, "2h": 7200, "4h": 14400, "8h": 28800, "24h": 86400 } as const;
export const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex");
export const createSecret = () => crypto.randomBytes(32).toString("base64url");

export async function demoCollections() {
  const db = await getMongoDb();
  const requests = db.collection("demoRequests"), access = db.collection("demoAccess"), clients = db.collection("demoClients"), audit = db.collection("demoAuditLogs");
  await Promise.all([requests.createIndex({ projectId: 1, email: 1, createdAt: -1 }), access.createIndex({ tokenHash: 1 }, { unique: true }), access.createIndex({ status: 1, expiresAt: 1 }), clients.createIndex({ clientId: 1 }, { unique: true }), audit.createIndex({ demoAccessId: 1, timestamp: -1 })]);
  return { requests, access, clients, audit };
}

export async function validateDemoAccess(token: string, projectId: string, clientId: string, clientSecret: string) {
  const { access, clients, audit } = await demoCollections(); const client = await clients.findOne({ clientId });
  if (!client || !crypto.timingSafeEqual(Buffer.from(client.secretHash), Buffer.from(hashToken(clientSecret))) || client.projectId !== projectId) return { allowed: false, reason: "CLIENT_UNAUTHORIZED" };
  const record = await access.findOne({ tokenHash: hashToken(token) }); if (!record) return { allowed: false, reason: "INVALID_TOKEN" };
  if (record.projectId !== projectId) return { allowed: false, reason: "PROJECT_MISMATCH" };
  if (record.status === "REVOKED") return { allowed: false, reason: "REVOKED" };
  const now = new Date(); if (record.expiresAt && now >= record.expiresAt) { await access.updateOne({ _id: record._id }, { $set: { status: "EXPIRED" } }); await audit.insertOne({ demoAccessId: record._id.toString(), action: "ACCESS_EXPIRED", timestamp: now }); return { allowed: false, reason: "EXPIRED" }; }
  if (!record.activatedAt) { const expiresAt = new Date(now.getTime() + record.accessDurationSeconds * 1000); await access.updateOne({ _id: record._id }, { $set: { status: "ACTIVE", activatedAt: now, expiresAt, lastActivityAt: now } }); await audit.insertOne({ demoAccessId: record._id.toString(), action: "ACCESS_ACTIVATED", timestamp: now }); return { allowed: true, projectId, expiresAt, requestId: record.requestId }; }
  await access.updateOne({ _id: record._id }, { $set: { lastActivityAt: now } }); return { allowed: true, projectId, expiresAt: record.expiresAt, requestId: record.requestId };
}

export const validObjectId = (id: string) => ObjectId.isValid(id);
