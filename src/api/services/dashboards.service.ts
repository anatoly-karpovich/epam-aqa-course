import { IRequestOptions, IResponse } from "../../types/api/apiClient.types";
import type { IDashboardDeleteResponse, IDashboardGetAllResponse, IDashboardResponse, IDashboardUpdateResponse, INewDashboardUI } from "../../types/dashboards/dashboards.types.js";
import { apiConfig } from "../apiConfig.js";
import apiClient from "../apiClients/apiClient.js";


class DashboardsService {
  createDashboard(dashboard: INewDashboardUI, projectName: string, token?: string): Promise<IResponse<IDashboardResponse>> {
    const options: IRequestOptions = {
      method: "post",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Dashboard(projectName),
      data: dashboard,
      headers: {
        Authorization: token ?? ""
      }
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  updateDashboard(dashboard: INewDashboardUI, dashboardId: number, projectName: string, token?: string): Promise<IResponse<IDashboardUpdateResponse>> {
    const options: IRequestOptions = {
      method: "put",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      data: dashboard,
      headers: {
        Authorization: token ?? ""
      }
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  getDashboardById(projectName: string, dashboardId: number, token?: string): Promise<IResponse<IDashboardResponse>> {
    const options: IRequestOptions = {
      method: "get",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      headers: {
        Authorization: token ?? ""
      }
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  getAllDashboards(projectName: string, token?: string): Promise<IResponse<IDashboardGetAllResponse>> {
    const options: IRequestOptions = {
      method: "get",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Dashboard(projectName),
      headers: {
        Authorization: token ?? ""
      }
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }

  deleteDashboard(projectName: string, dashboardId: number, token?: string): Promise<IResponse<IDashboardDeleteResponse>> {
    const options: IRequestOptions = {
      method: "delete",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints['Dashboard by Id'](projectName, dashboardId),
      headers: {
        Authorization: token ?? ""
      }
    }
    return apiClient.sendRequest<INewDashboardUI>(options)
  }
}

export default new DashboardsService();