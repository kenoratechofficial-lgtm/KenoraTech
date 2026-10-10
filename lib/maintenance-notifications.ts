import { getMongoDb } from "@/lib/mongodb";

export async function subscribeToMaintenanceNotifications(email: string) {
  const normalisedEmail = email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(normalisedEmail)) throw new Error("Please enter a valid email address.");
  const collection = (await getMongoDb()).collection("maintenanceNotifications");
  const existing = await collection.findOne({ email: normalisedEmail });
  if (existing) return { email: normalisedEmail, alreadySubscribed: true };
  await collection.insertOne({ email: normalisedEmail, subscribedAt: new Date(), notifiedAt: null, active: true });
  return { email: normalisedEmail, alreadySubscribed: false };
}

export async function listMaintenanceNotifications() {
  return (await (await getMongoDb()).collection("maintenanceNotifications").find({ active: true }).sort({ subscribedAt: -1 }).toArray()).map(item => ({ id: item._id.toString(), email: item.email, subscribedAt: item.subscribedAt?.toISOString?.() || new Date().toISOString() }));
}
