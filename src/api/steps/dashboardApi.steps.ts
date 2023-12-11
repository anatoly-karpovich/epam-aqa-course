import config from "../../config/config.js";
import { generateNewDashboard } from "../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../data/http.js";
import type { INewDashboardUI } from "../../types/dashboards/dashboards.types.js";
import DashboardsService from "../services/dashboards.service.js";
import Dashboards from "../../utils/entities/createdDashboard.js";
import LoggedInUsers from "../../utils/entities/loggedInUsers.js";
import { generateDeleteDashboardResponse } from "../../data/dashboards/response.js";
import { logStep } from "../../utils/reporter/decorators.js";
import { expect } from "chai";


class DashboardApiSteps {
  @logStep("Create dashboard via API")
  async createDashboard(projectName?: string, dashboardValues?: Partial<INewDashboardUI>, userToken?: string) {
    const dashboardData = generateNewDashboard(dashboardValues);
    const response = await DashboardsService.createDashboard(dashboardData, projectName ?? config.projectName, userToken ?? LoggedInUsers.getToken());
    expect(response.status).to.equal(STATUS_CODES.CREATED);
    const dashboard = response.data;
    Dashboards.addDashboard(dashboard);
    return dashboard;
  }

  @logStep("Delete dashboard via API")
  async deleteDashboard( dashboardId: number, projectName?: string, userToken?: string) {
    const response = await DashboardsService.deleteDashboard(projectName ?? config.projectName, dashboardId, userToken ?? LoggedInUsers.getToken());
    expect(response.status).to.equal(STATUS_CODES.OK);
    expect(response.data.message).to.equal(generateDeleteDashboardResponse(dashboardId));
  }
}

export default new DashboardApiSteps();
