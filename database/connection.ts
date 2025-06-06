import { Database, MongoClient } from "mongo";
import { DATABASE_URL } from "../common/constants.ts";
import { Logger } from "../common/logger.ts";

async function connect(retries = 5, delay = 1000): Promise<Database> {
  try {
    const client = new MongoClient();
    console.log(DATABASE_URL);

    return await client.connect(DATABASE_URL);
  } catch (error) {
    if (retries > 0) {
      Logger.error(error);
      Logger.info(`Retrying connection in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await connect(retries - 1, delay * 2);
    } else {
      Logger.critical(error);
      throw new Error("MongoDB connection failed:", {
        cause: error,
      });
    }
  }
}

export const conn = await connect();
