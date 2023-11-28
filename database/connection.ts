import { Database, MongoClient } from "mongo";
import { DATABASE_URL } from "../common/constants.ts";

async function connect(): Promise<Database> {
  const client = new MongoClient();
  return await client.connect(DATABASE_URL);
}

export const conn = await connect();
