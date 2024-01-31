import {
  ConsoleHandler,
  critical,
  debug,
  error,
  info,
  LevelName,
  setup,
  warning,
} from "std/log/mod.ts";
import { LOG_LEVEL } from "./constants.ts";

setup({
  handlers: {
    console: new ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: LOG_LEVEL as LevelName,
      handlers: ["console"],
    },
  },
});

export const Logger = {
  debug,
  info,
  warning,
  error,
  critical,
};
