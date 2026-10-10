import { ObjectId, type Document } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export const consultationTypes = ["Website Development", "Web Application", "Mobile App", "AI Solution", "UI/UX Design", "Custom Project"] as const;
export const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
export type AppointmentStatus = (typeof appointmentStatuses)[number];
export type Appointment = { id: string; name: string; email: string; phone: string; company: string; projectType: string; projectDescription: string; appointmentDate: string; appointmentTime: string; duration: number; status: AppointmentStatus; createdAt: string; updatedAt: string };
export const consultationSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

const clean = (value: unknown, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";
const email = (value: string) => /^\S+@\S+\.\S+$/.test(value);
const date = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00`).valueOf());

function normalize(doc: Document): Appointment { return { id: doc._id.toString(), name: doc.name, email: doc.email, phone: doc.phone, company: doc.company || "", projectType: doc.projectType, projectDescription: doc.projectDescription, appointmentDate: doc.appointmentDate, appointmentTime: doc.appointmentTime, duration: doc.duration || 30, status: doc.status, createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(), updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString() }; }

async function collection() {
  const db = await getMongoDb(), appointments = db.collection("appointments");
  await appointments.createIndex({ appointmentDate: 1, appointmentTime: 1 }, { unique: true, partialFilterExpression: { status: { $in: ["pending", "confirmed"] } }, name: "unique_active_appointment_slot" });
  return appointments;
}

export async function availableSlots(appointmentDate: string) {
  if (!date(appointmentDate)) throw new Error("Choose a valid consultation date.");
  const booked = await (await collection()).find({ appointmentDate, status: { $in: ["pending", "confirmed"] } }, { projection: { appointmentTime: 1 } }).toArray();
  const taken = new Set(booked.map(item => item.appointmentTime));
  return consultationSlots.filter(slot => !taken.has(slot));
}

export async function availableDates() {
  const dates: string[] = [], start = new Date(); start.setHours(12, 0, 0, 0);
  for (let offset = 0; offset < 90; offset += 1) { const value = new Date(start); value.setDate(start.getDate() + offset); if (value.getDay() !== 0 && value.getDay() !== 6) dates.push(value.toISOString().slice(0, 10)); }
  const booked = await (await collection()).aggregate([{ $match: { appointmentDate: { $in: dates }, status: { $in: ["pending", "confirmed"] } } }, { $group: { _id: "$appointmentDate", count: { $sum: 1 } } }]).toArray();
  const full = new Set(booked.filter(item => item.count >= consultationSlots.length).map(item => item._id));
  return dates.filter(value => !full.has(value));
}

export async function createAppointment(input: Record<string, unknown>) {
  const name = clean(input.name, 160), customerEmail = clean(input.email, 320).toLowerCase(), phone = clean(input.phone, 80), company = clean(input.company, 200), projectType = clean(input.projectType, 100), projectDescription = clean(input.projectDescription, 4000), appointmentDate = clean(input.appointmentDate, 10), appointmentTime = clean(input.appointmentTime, 20);
  if (!name || !email(customerEmail) || !phone || !consultationTypes.includes(projectType as (typeof consultationTypes)[number]) || !projectDescription || !date(appointmentDate) || !consultationSlots.includes(appointmentTime)) throw new Error("Please complete all required booking details.");
  if (appointmentDate < new Date().toLocaleDateString("en-CA")) throw new Error("Past dates cannot be booked.");
  const now = new Date();
  try { const result = await (await collection()).insertOne({ name, email: customerEmail, phone, company, projectType, projectDescription, appointmentDate, appointmentTime, duration: 30, status: "pending", createdAt: now, updatedAt: now }); return normalize({ _id: result.insertedId, name, email: customerEmail, phone, company, projectType, projectDescription, appointmentDate, appointmentTime, duration: 30, status: "pending", createdAt: now, updatedAt: now }); } catch (error: unknown) { if (typeof error === "object" && error && "code" in error && error.code === 11000) throw new Error("That time was just booked. Please choose another available slot."); throw error; }
}

export async function listAppointments(status?: string, appointmentDate?: string) { const filter: Record<string, unknown> = {}; if (appointmentStatuses.includes(status as AppointmentStatus)) filter.status = status; if (date(appointmentDate || "")) filter.appointmentDate = appointmentDate; return (await (await collection()).find(filter).sort({ appointmentDate: -1, appointmentTime: 1, createdAt: -1 }).toArray()).map(normalize); }
export async function getAppointment(id: string) { if (!ObjectId.isValid(id)) throw new Error("Invalid booking."); const record = await (await collection()).findOne({ _id: new ObjectId(id) }); if (!record) throw new Error("Booking not found."); return normalize(record); }
export async function updateAppointmentStatus(id: string, status: unknown) { if (!ObjectId.isValid(id) || !appointmentStatuses.includes(status as AppointmentStatus)) throw new Error("Invalid booking update."); const result = await (await collection()).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } }, { returnDocument: "after" }); if (!result) throw new Error("Booking not found."); return normalize(result); }
export async function deleteAppointment(id: string) { if (!ObjectId.isValid(id)) throw new Error("Invalid booking."); await (await collection()).deleteOne({ _id: new ObjectId(id) }); }
