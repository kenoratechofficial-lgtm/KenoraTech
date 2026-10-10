import { ObjectId, type Document } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  project: string;
  message: string;
};

export type ContactSubmission = ContactSubmissionInput & {
  id: string;
  createdAt: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createContactSubmission(input: Partial<ContactSubmissionInput>) {
  const name = cleanString(input.name);
  const email = cleanString(input.email);
  const project = cleanString(input.project);
  const message = cleanString(input.message);

  if (!name || !email || !project || !message) {
    throw new Error("Name, email, project and message are required.");
  }

  const db = await getMongoDb();
  await db.collection("contactSubmissions").insertOne({
    name,
    email,
    project,
    message,
    createdAt: new Date()
  });
}

function normalizeSubmission(doc: Document): ContactSubmission {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    project: doc.project,
    message: doc.message,
    createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString()
  };
}

export async function listContactSubmissions() {
  const db = await getMongoDb();
  const submissions = await db.collection("contactSubmissions").find({}).sort({ createdAt: -1 }).toArray();

  return submissions.map(normalizeSubmission);
}

export async function deleteContactSubmission(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid message id.");
  }

  const db = await getMongoDb();
  await db.collection("contactSubmissions").deleteOne({ _id: new ObjectId(id) });
}
