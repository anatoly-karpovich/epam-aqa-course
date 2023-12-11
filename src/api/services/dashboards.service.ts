import { IRequestOptions, IResponse } from "../../types/api/apiClient.types";
import type { IDashboardGetAllResponse, IDashboardMessageResponse, IDashboardResponse, INewDashboardUI } from "../../types/dashboards/dashboards.types.js";
import { apiConfig } from "../apiConfig.js";
import apiClient from "../apiClients/apiClient.js";


class DashboardsService {
  async createDashboard(dashboard: INewDashboardUI, projectName: string, token?: string): Promise<IResponse<IDashboardResponse>> {
    const options: IRequestOptions = {
      method: "post",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Dashboard(projectName),
      data: dashboard,
      headers: {
        Authorization: token ?? ""
      },
      requestType: "json"
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  async updateDashboard(dashboard: INewDashboardUI, dashboardId: number, projectName: string, token?: string): Promise<IResponse<IDashboardMessageResponse>> {
    const options: IRequestOptions = {
      method: "put",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      data: dashboard,
      headers: {
        Authorization: token ?? ""
      },
      requestType: "json"
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  async getDashboardById(projectName: string, dashboardId: number, token?: string): Promise<IResponse<IDashboardResponse>> {
    const options: IRequestOptions = {
      method: "get",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      headers: {
        Authorization: token ?? ""
      },
      requestType: "json"
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  async getAllDashboards(projectName: string, token?: string): Promise<IResponse<IDashboardGetAllResponse>> {
    const options: IRequestOptions = {
      method: "get",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Dashboard(projectName),
      headers: {
        Authorization: token ?? ""
      },
      requestType: "json"
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  async deleteDashboard(projectName: string, dashboardId: number, token?: string): Promise<IResponse<IDashboardMessageResponse>> {
    const options: IRequestOptions = {
      method: "delete",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      headers: {
        Authorization: token ?? ""
      },
      requestType: "json"
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }
}

export default new DashboardsService();