export type IRequestOptions<Data = object> = {
  method: Method;
  requestType: "json" | "formData";
  baseURL: string;
  url: string;
  params?: Record<string, string | readonly string[]>;
  headers: Record<string, string>;
  data?: Data;
  timeout?: number;
};

type Method = "post" | "get" | "put" | "patch" | "delete";

export interface IApiClient {
  sendRequest<T>(options: IRequestOptions): Promise<IResponse<T>>;
  sendFormDataRequest<T>(options: IRequestOptions): Promise<IResponse<T>>;
}

export interface IResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, unknown>;
}

interface RequestParams<T> {
  data?: T;
}

export interface DashboardRequestParams<T> extends RequestParams<T> {
  projectName: string;
  dashboardId?: number;
}