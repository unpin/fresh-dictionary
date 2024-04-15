import { Database, MongoClient } from "mongo";
import { DATABASE_URL } from "../common/constants.ts";

async function connect(): Promise<Database> {
  const client = new MongoClient();
  try {
    return await client.connect(DATABASE_URL);
  } catch {
    Deno.exit(1);
  }
}

export const conn = await connect();
