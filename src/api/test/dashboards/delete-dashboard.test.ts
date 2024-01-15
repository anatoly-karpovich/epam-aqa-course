import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import config from "../../../config/config.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import _ from "lodash";
import { generateDeleteDashboardResponse } from "../../../data/dashboards/response.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";
import { errorSchema, messageSchema } from "../../../data/json-schemas.ts/common.shema.js";
import { expect } from "chai";

const dashboardIds: number[] = [];
describe("[API] Dashboards - DELETE method", () => {
  beforeEach(async () => {
    const token = await LoginApiSteps.loginAsAdmin();
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.projectName, token);
    expect(createDashboardResponse.status).to.equal(STATUS_CODES.CREATED);
    expect(createDashboardResponse.data).not.to.equal(undefined);
    dashboardIds.push(createDashboardResponse.data.id);
  });

  it("Delete existing Dashboard", async () => {
    const dashboardId = dashboardIds[dashboardIds.length - 1];
    const deleteDashboardResponse = await DashboardsService.deleteDashboard(config.projectName, dashboardId, LoggedInUsers.getToken());
    expect(deleteDashboardResponse.status).to.equal(STATUS_CODES.OK);
    expect(deleteDashboardResponse.data).not.to.equal(undefined);
    expect(deleteDashboardResponse.data.message).to.equal(generateDeleteDashboardResponse(dashboardId));
    validateSchema(deleteDashboardResponse, messageSchema);
  });

  it("Delete not existing Dashboard", async () => {
    const dashboardId = dashboardIds[dashboardIds.length - 1];
    const deleteDashboardResponse = await DashboardsService.deleteDashboard(config.projectName, dashboardId, LoggedInUsers.getToken());
    expect(deleteDashboardResponse.status).to.equal(STATUS_CODES.NOT_FOUND);
    validateSchema(deleteDashboardResponse, errorSchema);
  });
});
