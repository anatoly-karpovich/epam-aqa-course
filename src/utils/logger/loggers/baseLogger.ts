import _ from "lodash";

export abstract class Logger {
  protected logArray: string[] = [];
  private static instance: Logger;
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
  }

  log(message: string, logLevel?: logLevels): void {}
  sendLogsToReport(): void {}
  clearLog(): void {
    _.remove(this.logArray);
  }
}

type logLevels = "info" | "error" | "warn";
