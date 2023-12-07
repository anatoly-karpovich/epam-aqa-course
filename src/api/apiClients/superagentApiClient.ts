import { BaseApiClient } from "./baseApiClient.js";
import ReporterService from "../../utils/reporter/reporter.js";
import LoggerService from "../../utils/logger/logger.js";
import superagent, { SuperAgentStatic } from "superagent";

class SuperagentApiClient extends BaseApiClient {
  protected createRequestInstance(): void {
    if (this.options) {
      const agent: SuperAgentStatic = superagent.agent();
      this.request = agent[this.options.method](this.options.baseURL + this.options.url);
    }
  }

  protected async send() {
    return await this.request;
  }

  protected transformRequestOptions(): void {
    if(!this.options) throw new Error(`Request options were not provided`);
    if (this.options.headers) this.request.set(this.options.headers);

    if (this.options.requestType === "json") {
      if (this.options.data) this.request.send(this.options.data);
    } else if (this.options.requestType === "formData") {
      if (this.options.data) {
        const data = this.options.data;
        Object.keys(data).forEach((key) => {
          this.request.field(key, data[key]);
        });
      }
    }
  }
  protected transformResponse(): void {
    const transormedResponse = {
      data: this.response.body,
      status: this.response.statusCode,
      headers: this.response.headers,
    };
    this.response = transormedResponse;
  }

  protected logError(error: any): void {
    console.log("Error: ", error.response.text);
    console.log("Status: ", error.response.status, "Request URL:", this.options?.method, this.options?.url);
  }
}

export default new SuperagentApiClient(ReporterService, LoggerService);
