import { MongoClient } from "mongodb";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {};

export class DatabaseConnectionError extends Error {
  constructor(message = "Database connection failed. Check MongoDB Atlas environment variables and Network Access.") {
    super(message);
    this.name = "DatabaseConnectionError";
  }
}

export async function getMongoDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new DatabaseConnectionError("MONGODB_URI is not configured.");
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new DatabaseConnectionError("MONGODB_URI must start with mongodb:// or mongodb+srv://.");
  }

  const mongoClientPromise = globalThis.__mongoClientPromise ?? new MongoClient(uri, options).connect();

  if (process.env.NODE_ENV !== "production") {
    globalThis.__mongoClientPromise = mongoClientPromise;
  }

  try {
    const client = await mongoClientPromise;
    return client.db(process.env.MONGODB_DB || "kenora-tech");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new DatabaseConnectionError();
  }
}
