import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { analyticsCollections } from "@/lib/analytics";
import { trafficSources } from "@/lib/traffic-source";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const range = new URL(request.url).searchParams.get("range") || "today"; const now = new Date(); const start = new Date(now);
  if (range === "yesterday") { start.setHours(0,0,0,0); start.setDate(start.getDate()-1); now.setHours(0,0,0,0); } else { start.setHours(0,0,0,0); if (range === "7d") start.setDate(start.getDate()-6); if (range === "30d") start.setDate(start.getDate()-29); }
  const { sessions, pageViews } = await analyticsCollections(); const match = { timestamp: { $gte: start, $lt: now } }; const activeAfter = new Date(Date.now()-120000);
  const [views, visitors, sources, pages, devices, active, activity] = await Promise.all([
    pageViews.countDocuments(match), pageViews.distinct("visitorId", match), pageViews.aggregate([{ $match: match }, { $group: { _id: "$source", count: { $sum: 1 } } }]).toArray(), pageViews.aggregate([{ $match: match }, { $group: { _id: "$pagePath", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 8 }]).toArray(), pageViews.aggregate([{ $match: match }, { $group: { _id: "$device", count: { $sum: 1 } } }]).toArray(), sessions.find({ lastSeenAt: { $gte: activeAfter } }).sort({ lastSeenAt: -1 }).toArray(), sessions.find({ lastSeenAt: { $gte: activeAfter } }).sort({ lastSeenAt: -1 }).limit(8).project({ source: 1, currentPage: 1, lastSeenAt: 1 }).toArray()
  ]);
  const returning = await sessions.countDocuments({ firstSeenAt: { $lt: start }, lastSeenAt: { $gte: start, $lt: now } }); const sourceMap = Object.fromEntries(sources.map((x) => [x._id, x.count])); const activeMap = Object.fromEntries(active.reduce((rows: Array<{_id:string;count:number}>, session) => { const row=rows.find((item)=>item._id===session.source); if(row) row.count++; else rows.push({_id:session.source,count:1}); return rows; }, [] as Array<{_id:string;count:number}>).map((x)=>[x._id,x.count]));
  return NextResponse.json({ realtime: { active: active.length, sources: Object.fromEntries(trafficSources.map((s)=>[s, activeMap[s]||0])), activity: activity.map((x)=>({ source:x.source, pagePath:x.currentPage, lastSeenAt:x.lastSeenAt })) }, overview: { visitors: visitors.length, pageViews: views, newVisitors: Math.max(0, visitors.length-returning), returningVisitors: returning }, sources: Object.fromEntries(trafficSources.map((s)=>[s,sourceMap[s]||0])), pages: pages.map((x)=>({ path:x._id,count:x.count })), devices: Object.fromEntries(devices.map((x)=>[x._id,x.count])) });
}
