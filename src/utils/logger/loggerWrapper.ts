import { Logger } from "./loggers/baseLogger.js";
import * as loggers from "./loggers/index.js";

export class LoggerFactory {
  static getLogger(name?: keyof typeof loggers): Logger {
    return loggers[name ? name : "WinstonLogger"];
  }
}

