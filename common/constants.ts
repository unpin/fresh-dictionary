import { loadSync } from "std/dotenv/mod.ts";

const isProd = Deno.env.get("env")?.toUpperCase() === "PRODUCTION";

export const {
  DATABASE_URL,
  PORT,
  JWT_SECRET,
  LOG_LEVEL,
  TEST,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  OPENAI_API_KEY,
} = isProd
  ? Deno.env
    .toObject()
  : loadSync();
