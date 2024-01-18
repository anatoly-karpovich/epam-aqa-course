import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import DashboardApiSteps from "../../steps/dashboardApi.steps.js";
import config from "../../../config/environment.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import { invalid_dashboard } from "../../../data/dashboards/dashboard-test-body.js";
import _ from "lodash";
import { errorSchema, idSchema } from "../../../data/json-schemas.ts/common.shema.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";
import { expect } from "chai";

const dashboardIds: number[] = [];
describe("[API] Dashboards - POST method", () => {
  beforeEach(async () => {});

  it("Create Dashboard with valid data", async () => {
    await LoginApiSteps.loginAsAdmin();
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).to.equal(STATUS_CODES.CREATED);
    expect(createDashboardResponse.data).not.to.equal(undefined);
    validateSchema(createDashboardResponse, idSchema);
    dashboardIds.push(createDashboardResponse.data.id);
  });

  for (const dashboardData of invalid_dashboard) {
    it(`Create Dashboard with invalid data - ${dashboardData.testName}`, async () => {
      const dashboard = _.omit(dashboardData, "testName");
      const createDashboardResponse = await DashboardsService.createDashboard(dashboard, config.PROJECT_NAME, LoggedInUsers.getToken());
      expect(createDashboardResponse.status).to.equal(STATUS_CODES.INVALID_REQUEST);
      validateSchema(createDashboardResponse, errorSchema);
    });
  }

  it("Add Dashboard with not unique name", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).to.equal(STATUS_CODES.CREATED);
    dashboardIds.push(createDashboardResponse.data.id);

    const createNotUniqueDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.PROJECT_NAME, LoggedInUsers.getToken());
    expect(createNotUniqueDashboardResponse.status).to.equal(STATUS_CODES.ALREADY_EXISTS);
    validateSchema(createNotUniqueDashboardResponse, errorSchema);
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
