import config from "../config/config.js";

export const apiConfig = {
  baseURL: config.baseUrl,
  endpoints: {
    ['Dashboard']: (projectName: string) => `api/v1/${projectName}/dashboard`,
    ['Dashboard by Id']: (projectName: string, dashboardId: number) => `api/v1/${projectName}/dashboard/${dashboardId}`,
    ['Token']: `/uat/sso/oauth/token`,
  }
}