import { BaseReporter } from "./baseReporter.js";
import { allure } from 'allure-mocha/dist/MochaAllureReporter.js'

class AllureMochaReporter extends BaseReporter {
  protected reportApiRequestData(): void {
    allure.step(`Request: ${this.requestOptions?.method?.toUpperCase()} ${this.requestOptions?.url}`, () => {
      allure.attachment("Request Headers", JSON.stringify(this.requestOptions?.headers, null, 2), "application/json");
      allure.attachment("Request Body", this.requestOptions?.data ? JSON.stringify(this.requestOptions?.data, null, 2) : "{}", "application/json");
    });
  }

  protected reportApiResponseData() {
    allure.step(`Response: ${this.response?.status} ${this.requestOptions?.url}`, () => {
      allure.attachment("Response Headers", JSON.stringify(this.response?.headers, null, 2), "application/json");
      allure.attachment("Response Body", JSON.stringify(this.response?.data, null, 2), "application/json");
    });
  }

  attachLog(log: string) {
    allure.attachment("Test Log", log, "text/plain");
  }
}

export default new AllureMochaReporter();