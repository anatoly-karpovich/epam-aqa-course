import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import DashboardApiSteps from "../../steps/dashboardApi.steps.js";
import config from "../../../config/config.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import { invalid_dashboard } from "../../../data/dashboards/dashboard-test-body.js";
import _ from "lodash";
import { errorSchema, idSchema } from "../../../data/json-schemas.ts/common.shema.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";

const dashboardIds: number[] = [];
describe("[API] Dashboards - POST method", () => {
  before(async () => {
    await LoginApiSteps.loginAsAdmin();
  });

  it("Create Dashboard with valid data", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.projectName, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).toBe(STATUS_CODES.CREATED);
    expect(createDashboardResponse.data).not.toBe(undefined);
    validateSchema(createDashboardResponse, idSchema)
    dashboardIds.push(createDashboardResponse.data.id);
  });

  for (const dashboardData of invalid_dashboard) {
    it(`Create Dashboard with invalid data - ${dashboardData.testName}`, async () => {
      const dashboard = _.omit(dashboardData, "testName")
      const createDashboardResponse = await DashboardsService.createDashboard(dashboard, config.projectName, LoggedInUsers.getToken());
      expect(createDashboardResponse.status).toBe(STATUS_CODES.INVALID_REQUEST);
      validateSchema(createDashboardResponse, errorSchema)
    });
  }

  afterEach(async () => {
    if (dashboardIds.length) {
      for (const d of dashboardIds) {
        await DashboardApiSteps.deleteDashboard(d);
      }
      dashboardIds.length = 0;
    }
  });
});
