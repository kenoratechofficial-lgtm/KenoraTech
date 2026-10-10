import { ObjectId, type Document } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  skills: string[];
  description: string;
  published: boolean;
  createdAt: string;
};

export type JobInput = Omit<Job, "id" | "createdAt">;

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";

function normalize(doc: Document): Job {
  return { id: doc._id.toString(), title: doc.title, department: doc.department, location: doc.location, type: doc.type, experience: doc.experience, salary: doc.salary, skills: Array.isArray(doc.skills) ? doc.skills : [], description: doc.description, published: doc.published !== false, createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString() };
}

function sanitize(input: Partial<JobInput>) {
  const job = { title: text(input.title), department: text(input.department), location: text(input.location), type: text(input.type), experience: text(input.experience), salary: text(input.salary), description: text(input.description), skills: Array.isArray(input.skills) ? input.skills.map(text).filter(Boolean) : [], published: input.published !== false };
  if (!job.title || !job.department || !job.location || !job.type || !job.experience || !job.description) throw new Error("Title, department, location, employment type, experience and description are required.");
  return job;
}

async function collection() { return (await getMongoDb()).collection("jobs"); }

export async function listJobs(includeUnpublished = false) {
  const docs = await (await collection()).find(includeUnpublished ? {} : { published: true }).sort({ createdAt: -1 }).toArray();
  return docs.map(normalize);
}

export async function createJob(input: Partial<JobInput>) {
  const result = await (await collection()).insertOne({ ...sanitize(input), createdAt: new Date(), updatedAt: new Date() });
  const doc = await (await collection()).findOne({ _id: result.insertedId });
  if (!doc) throw new Error("Job was created but could not be loaded.");
  return normalize(doc);
}

export async function updateJob(id: string, input: Partial<JobInput>) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid job id.");
  const jobs = await collection();
  await jobs.updateOne({ _id: new ObjectId(id) }, { $set: { ...sanitize(input), updatedAt: new Date() } });
  const doc = await jobs.findOne({ _id: new ObjectId(id) });
  if (!doc) throw new Error("Job could not be found.");
  return normalize(doc);
}

export async function deleteJob(id: string) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid job id.");
  await (await collection()).deleteOne({ _id: new ObjectId(id) });
}
