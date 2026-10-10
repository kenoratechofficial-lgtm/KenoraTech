import { getMongoDb } from "@/lib/mongodb";
export { trafficSources, type TrafficSource, classifySource } from "@/lib/traffic-source";

export async function analyticsCollections() {
  const db = await getMongoDb();
  const sessions = db.collection("analyticsSessions");
  const pageViews = db.collection("analyticsPageViews");
  await Promise.all([
    sessions.createIndex({ sessionId: 1 }, { unique: true }), sessions.createIndex({ lastSeenAt: -1 }),
    pageViews.createIndex({ timestamp: -1 }), pageViews.createIndex({ sessionId: 1, timestamp: -1 }),
    pageViews.createIndex({ source: 1, timestamp: -1 }), pageViews.createIndex({ pagePath: 1, timestamp: -1 })
  ]);
  return { sessions, pageViews };
}
