import type { IApiClient, IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import superagent, { SuperAgentRequest, SuperAgentStatic } from "superagent";
import { logApiStep } from "../../utils/reporter/decorators.js";

class SuperagentApiClient implements IApiClient {
  private agent: SuperAgentStatic;

  constructor() {
    this.agent = superagent.agent();
  }
  
  @logApiStep
  async sendRequest<T>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      const response = await this.createRequest(options).then((req) => req);
      return this.transformResponse<T>(response);
    } catch (error: any) {
      console.log("Status:", error.response.status, "Request URL:", options.method, options.url);
      console.log("Error:", error.response.text)
      return this.transformResponse<T>(error.response);
    }
  }

  @logApiStep
  async sendFormDataRequest<T>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      const response = await this.createFormDataRequest(options);
      return this.transformResponse<T>(response);
    } catch (error: any) {
      console.log("Status: ", error.response.status, "Request URL:", options.method, options.url);
      console.log("Error: ", error.response.text)
      return this.transformResponse<T>(error.response);
    }
  }

  private createRequest(options: IRequestOptions): SuperAgentRequest {
    const request = this.agent[options.method](options.baseURL + options.url);
    if (options.headers) request.set(options.headers);
    if (options.data) request.send(options.data);
    return request;
  }

  private createFormDataRequest(options: IRequestOptions): SuperAgentRequest {
    const request = this.agent[options.method](options.baseURL + options.url);

    if (options.headers) {
      request.set(options.headers);
    }

    if (options.data) {
      const data = options.data;
      Object.keys(data).forEach((key) => {
        request.field(key, data[key]);
      });
    }

    return request;
  }

  transformResponse<T>(response: superagent.Response): IResponse<T> {
    return {
      data: response.body,
      status: response.statusCode,
      headers: response.headers,
    };
  }
}

export default new SuperagentApiClient();
