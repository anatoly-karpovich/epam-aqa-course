import DashboardApiSteps from "../../steps/dashboardApi.steps.js";
import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import config from "../../../config/environment.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";
import { allDashboardsSchema, dashboardSchema } from "../../../data/json-schemas.ts/dashboard.schema.js";
import { errorSchema } from "../../../data/json-schemas.ts/common.shema.js";
import { expect } from "chai";

const dashboardIds: number[] = [];

describe("[API] Dashboards - GET method", () => {
  beforeEach(async () => {
    await LoginApiSteps.loginAsAdmin();
  });

  it("Get existing dashboard", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).to.equal(STATUS_CODES.CREATED);
    const dashboardId = createDashboardResponse.data.id;
    dashboardIds.push(dashboardId);

    const getDashboardResponse = await DashboardsService.getDashboardById(config.PROJECT_NAME, dashboardId, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).to.equal(200);
    expect(createDashboardResponse.data).not.to.equal(undefined);
    validateSchema(getDashboardResponse, dashboardSchema);
  });

  it("Get all dashboards", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).to.equal(STATUS_CODES.CREATED);
    const dashboardId = createDashboardResponse.data.id;
    dashboardIds.push(dashboardId);

    const getDashboardResponse = await DashboardsService.getAllDashboards(config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).to.equal(STATUS_CODES.OK);
    expect(createDashboardResponse.data).not.to.equal(undefined);
    expect(getDashboardResponse.data.content.length).to.be.greaterThan(0);
    validateSchema(getDashboardResponse, allDashboardsSchema);
  });

  it("Get not existing dashboard", async () => {
    const getDashboardResponse = await DashboardsService.getDashboardById(config.PROJECT_NAME, 0, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).to.equal(STATUS_CODES.NOT_FOUND);
    validateSchema(getDashboardResponse, errorSchema);
  });

  afterEach(async () => {
    if (dashboardIds.length) {
      for (const d of dashboardIds) {
        await DashboardApiSteps.deleteDashboard(d);
      }
      dashboardIds.length = 0;
    }
  });
});
