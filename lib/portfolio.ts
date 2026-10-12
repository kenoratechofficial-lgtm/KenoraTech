import { ObjectId, type Document } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  intro?: string;
  result: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  projectType?: "project" | "app" | "website" | "software";
  status: "draft" | "published";
  androidUrl?: string;
  websiteUrl?: string;
  details?: string;
  demoEnabled: boolean;
  demoRequiresApproval: boolean;
  watermarkEnabled: boolean;
  sortOrder: number;
  createdAt: string;
  creatorIds?: string[];
  creatorNames?: string[];
  // Legacy fields retained so projects saved with the original single creator remain readable.
  creatorId?: string;
  creatorName?: string;
};

export type PortfolioProjectInput = {
  title: string;
  category: string;
  description: string;
  intro?: string;
  result: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  projectType?: "project" | "app" | "website" | "software";
  status?: "draft" | "published";
  androidUrl?: string;
  websiteUrl?: string;
  details?: string;
  demoEnabled?: boolean;
  demoRequiresApproval?: boolean;
  demoUrl?: string;
  watermarkEnabled?: boolean;
  sortOrder?: number;
  creatorIds?: string[];
  creatorNames?: string[];
  creatorId?: string;
  creatorName?: string;
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
    intro: typeof doc.intro === "string" ? doc.intro : undefined,
    result: doc.result,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    imageUrl: doc.imageUrl || undefined,
    liveUrl: doc.liveUrl || undefined,
    projectType: ["project", "app", "website", "software"].includes(doc.projectType) ? doc.projectType : "project",
    status: doc.status === "draft" ? "draft" : "published",
    androidUrl: typeof doc.androidUrl === "string" ? doc.androidUrl : undefined,
    websiteUrl: typeof doc.websiteUrl === "string" ? doc.websiteUrl : undefined,
    details: typeof doc.details === "string" ? doc.details : undefined,
    demoEnabled: doc.demoEnabled === true,
    demoRequiresApproval: doc.demoRequiresApproval === true,
    watermarkEnabled: doc.watermarkEnabled === true,
    sortOrder: Number(doc.sortOrder || 0),
    createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
    creatorIds: Array.isArray(doc.creatorIds) ? doc.creatorIds.filter((id: unknown): id is string => typeof id === "string") : typeof doc.creatorId === "string" ? [doc.creatorId] : undefined,
    creatorNames: Array.isArray(doc.creatorNames) ? doc.creatorNames.filter((name: unknown): name is string => typeof name === "string") : typeof doc.creatorName === "string" ? [doc.creatorName] : undefined,
    creatorId: typeof doc.creatorId === "string" ? doc.creatorId : undefined,
    creatorName: typeof doc.creatorName === "string" ? doc.creatorName : undefined
  };
}

function sanitizeProjectInput(input: Partial<PortfolioProjectInput>) {
  const title = cleanString(input.title);
  const category = cleanString(input.category);
  const description = cleanString(input.description);
  const intro = cleanString(input.intro);
  const details = cleanString(input.details);
  const projectType = ["project", "app", "website", "software"].includes(String(input.projectType)) ? input.projectType : "project";
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
    intro,
    details,
    projectType,
    status: input.status === "draft" ? "draft" : "published",
    result,
    tags,
    imageUrl: cleanString(input.imageUrl) || undefined,
    liveUrl: cleanString(input.liveUrl) || undefined,
    androidUrl: cleanString(input.androidUrl) || undefined,
    websiteUrl: cleanString(input.websiteUrl) || undefined,
    demoEnabled: input.demoEnabled === true,
    demoRequiresApproval: input.demoEnabled === true && input.demoRequiresApproval === true,
    demoUrl: cleanString(input.demoUrl) || undefined,
    watermarkEnabled: input.watermarkEnabled === true,
    sortOrder: Number(input.sortOrder || 0),
    creatorIds: Array.isArray(input.creatorIds) ? [...new Set(input.creatorIds.map(cleanString).filter(Boolean))] : cleanString(input.creatorId) ? [cleanString(input.creatorId)] : [],
    creatorNames: Array.isArray(input.creatorNames) ? input.creatorNames.map(cleanString).filter(Boolean) : cleanString(input.creatorName) ? [cleanString(input.creatorName)] : []
  };
}

async function getPortfolioCollection() {
  const db = await getMongoDb();
  return db.collection("portfolioProjects");
}

export async function listPortfolioProjects() {
  const collection = await getPortfolioCollection();
  const db = await getMongoDb();
  const migrations = db.collection("portfolioMigrations");
  const publishKenoraQrId = new ObjectId("64a000000000000000000002");
  if (!await migrations.findOne({ _id: publishKenoraQrId })) {
    await collection.updateOne({ title: "Kenora QR Studio" }, { $set: { status: "published", projectType: "website" } });
    await migrations.updateOne({ _id: publishKenoraQrId }, { $setOnInsert: { completedAt: new Date() } }, { upsert: true });
  }
  await collection.updateOne(
    { title: "VikcastX" },
    { $setOnInsert: {
      title: "VikcastX", category: "App", projectType: "app", status: "published",
      description: "Explore VikcastX on Android or visit the website.",
      details: "Explore VikcastX on Android or visit the VikcastX website.", result: "", tags: [],
      androidUrl: "https://vikcastx.com/download#android-download", websiteUrl: "https://vikcastx.com/",
      liveUrl: "https://vikcastx.com/", demoEnabled: false, demoRequiresApproval: false,
      watermarkEnabled: false, sortOrder: 0, createdAt: new Date(), updatedAt: new Date()
    } },
    { upsert: true }
  );
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
  if (input.demoEnabled === undefined) project.demoEnabled = existing.demoEnabled === true;
  if (input.demoRequiresApproval === undefined) project.demoRequiresApproval = existing.demoRequiresApproval === true;
  if (input.watermarkEnabled === undefined) project.watermarkEnabled = existing.watermarkEnabled === true;
  if (input.creatorIds === undefined) project.creatorIds = Array.isArray(existing.creatorIds) ? existing.creatorIds : typeof existing.creatorId === "string" ? [existing.creatorId] : [];
  if (input.creatorNames === undefined) project.creatorNames = Array.isArray(existing.creatorNames) ? existing.creatorNames : typeof existing.creatorName === "string" ? [existing.creatorName] : [];
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
