import { ObjectId, type Document } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  demoEnabled: boolean;
  demoRequiresApproval: boolean;
  watermarkEnabled: boolean;
  sortOrder: number;
  createdAt: string;
};

export type PortfolioProjectInput = {
  title: string;
  category: string;
  description: string;
  result: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  demoEnabled?: boolean;
  demoRequiresApproval?: boolean;
  demoUrl?: string;
  watermarkEnabled?: boolean;
  sortOrder?: number;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeProject(doc: Document): PortfolioProject {
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    description: doc.description,
    result: doc.result,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    imageUrl: doc.imageUrl || undefined,
    liveUrl: doc.liveUrl || undefined,
    demoEnabled: doc.demoEnabled === true,
    demoRequiresApproval: doc.demoRequiresApproval === true,
    watermarkEnabled: doc.watermarkEnabled === true,
    sortOrder: Number(doc.sortOrder || 0),
    createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString()
  };
}

function sanitizeProjectInput(input: Partial<PortfolioProjectInput>) {
  const title = cleanString(input.title);
  const category = cleanString(input.category);
  const description = cleanString(input.description);
  const result = cleanString(input.result);
  const tags = Array.isArray(input.tags)
    ? input.tags.map((tag) => cleanString(tag)).filter(Boolean)
    : [];

  if (!title || !category || !description || !result) {
    throw new Error("Title, category, description and result are required.");
  }

  return {
    title,
    category,
    description,
    result,
    tags,
    imageUrl: cleanString(input.imageUrl) || undefined,
    liveUrl: cleanString(input.liveUrl) || undefined,
    demoEnabled: input.demoEnabled === true,
    demoRequiresApproval: input.demoEnabled === true && input.demoRequiresApproval === true,
    demoUrl: cleanString(input.demoUrl) || undefined,
    watermarkEnabled: input.watermarkEnabled === true,
    sortOrder: Number(input.sortOrder || 0)
  };
}

async function getPortfolioCollection() {
  const db = await getMongoDb();
  return db.collection("portfolioProjects");
}

export async function listPortfolioProjects() {
  const collection = await getPortfolioCollection();
  const projects = await collection.find({}).sort({ sortOrder: 1, createdAt: -1 }).toArray();

  return projects.map(normalizeProject);
}

export async function createPortfolioProject(input: Partial<PortfolioProjectInput>) {
  const collection = await getPortfolioCollection();
  const project = sanitizeProjectInput(input);
  const now = new Date();
  const result = await collection.insertOne({
    ...project,
    createdAt: now,
    updatedAt: now
  });

  const created = await collection.findOne({ _id: result.insertedId });
  if (!created) {
    throw new Error("Project was created but could not be loaded.");
  }

  return normalizeProject(created);
}

export async function updatePortfolioProject(id: string, input: Partial<PortfolioProjectInput>) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid project id.");
  }

  const collection = await getPortfolioCollection();
  const project = sanitizeProjectInput(input);
  const existing = await collection.findOne({ _id: new ObjectId(id) });
  if (!existing) {
    throw new Error("Project could not be found.");
  }
  // Protected demo URLs are never returned by the public project API; preserve the
  // existing private URL unless an admin explicitly enters a replacement value.
  if (!project.demoUrl && existing.demoUrl) project.demoUrl = existing.demoUrl;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...project,
        updatedAt: new Date()
      }
    }
  );

  const updated = await collection.findOne({ _id: new ObjectId(id) });
  if (!updated) {
    throw new Error("Project could not be found.");
  }

  return normalizeProject(updated);
}

export async function deletePortfolioProject(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid project id.");
  }

  const collection = await getPortfolioCollection();
  await collection.deleteOne({ _id: new ObjectId(id) });
}
