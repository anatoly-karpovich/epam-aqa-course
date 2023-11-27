import type { IApiClient, IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import FormData from "form-data";
import { logApiStep } from "../../utils/reporter/decorators.js";

const request = axios.create();
let response: AxiosResponse;

class AxiosApiClient implements IApiClient {

  @logApiStep
  async sendRequest<T>(options: IRequestOptions): Promise<IResponse<T>> {
    options.timeout ? options.timeout : 120000;
    try {
      response = await request(options as AxiosRequestConfig);
    } catch (err: any) {
      console.log("Error", err.isAxiosError ? err.message : err);
      console.log("Request URL:", options.method, options.url);
      return this.transformResponse(err.response);
    }
    return this.transformResponse(response);
  }

  @logApiStep
  async sendFormDataRequest<T>(options: IRequestOptions): Promise<IResponse<T>> {
    const formData = new FormData();

    if (!options.data) {
      throw new Error("Request body was not provided");
    }

    for (const key in options.data) {
      formData.append(key, options.data[key]);
    }

    options.headers["Content-Type"] = `multipart/form-data; boundary=${formData.getBoundary()}`;
    options.data = formData;

    try {
      response = await request(options as AxiosRequestConfig);
    } catch (err: any) {
      console.log("Error", err.isAxiosError ? err.message : err);
      console.log("Request URL:", options.method, options.url);
      return this.transformResponse(err.response);
    }

    return this.transformResponse(response);
  }

  transformResponse<T>(response: AxiosResponse): IResponse<T> {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }
}

export default new AxiosApiClient();
