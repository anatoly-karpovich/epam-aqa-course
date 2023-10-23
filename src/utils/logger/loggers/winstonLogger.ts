import * as winston from "winston";
import _ from "lodash";
import { attachLog } from "../../reporter/reporter.js";
import { Logger } from "./baseLogger.js";

type logLevels = "info" | "error";

class WinstonLogger extends Logger {
  constructor() {
    super();
  }
  private logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
      )
    ),
    transports: [new winston.transports.Console()],
  });

  log(message: string, level: logLevels = "info") {
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}`;
    this.logArray.push(logEntry);
    if (process.env.DEBUG === "true") {
      this.logger.log({ level, message });
    }
  }

  sendLogsToReport() {
    const log = this.logArray.join("\n");
    attachLog(log);
    this.clearLog();
  }

  clearLog() {
    _.remove(this.logArray);
  }
}

export default new WinstonLogger();
