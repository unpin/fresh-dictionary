import { load } from "std/dotenv/mod.ts";

const isProd = Deno.env.get("env")?.toUpperCase() === "PRODUCTION";

export const { DATABASE_URL, PORT, JWT_SECRET, LOG_LEVEL, TEST } = isProd
  ? Deno.env
    .toObject()
  : await load();
