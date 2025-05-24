import { loadSync } from "std/dotenv/mod.ts";

const isProd = Deno.env.get("ENVIRONMENT") === "PRODUCTION";

if (!isProd) {
  loadSync({ export: true });
}

const getEnv = (key: string): string => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const DATABASE_URL = getEnv("DATABASE_URL");
export const PORT = getEnv("PORT");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const LOG_LEVEL = getEnv("LOG_LEVEL");
export const ADMIN_EMAIL = getEnv("ADMIN_EMAIL");
export const ADMIN_PASSWORD = getEnv("ADMIN_PASSWORD");
export const OPENAI_API_KEY = getEnv("OPENAI_API_KEY");
