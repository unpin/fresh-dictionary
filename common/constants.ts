import { loadSync } from "std/dotenv/mod.ts";
import { type LevelName } from "std/log/mod.ts";

const isProd = Deno.env.get("ENVIRONMENT") === "PRODUCTION";
if (!isProd) {
  loadSync({ export: true });
}
export const IS_PROD = isProd;

const getEnv = (key: string, fallback?: string): string => {
  const value = Deno.env.get(key) ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

const parseLogLevel = (value: string): LevelName => {
  const level = value.toUpperCase();
  const validLevels: ReadonlyArray<string> = [
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
    "CRITICAL",
  ];
  if (!validLevels.includes(level)) {
    throw new Error(
      `Invalid LOG_LEVEL: "${level}". Must be one of ${
        validLevels.join(", ")
      }.`,
    );
  }
  return level as LevelName;
};

export const DATABASE_URL = getEnv("DATABASE_URL");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const LOG_LEVEL = parseLogLevel(getEnv("LOG_LEVEL", "INFO"));
export const OPENAI_API_KEY = getEnv("OPENAI_API_KEY");
export const ADMIN_EMAIL = getEnv("ADMIN_EMAIL");
export const ADMIN_PASSWORD = getEnv("ADMIN_PASSWORD");
