import {
  ConsoleHandler,
  critical,
  debug,
  error,
  info,
  setup,
  warn,
} from "std/log/mod.ts";
import { LOG_LEVEL } from "./constants.ts";

setup({
  handlers: {
    console: new ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: LOG_LEVEL,
      handlers: ["console"],
    },
  },
});

export const Logger = {
  debug,
  info,
  warn,
  error,
  critical,
};
