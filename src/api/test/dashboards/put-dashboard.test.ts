import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import DashboardApiSteps from "../../steps/dashboardApi.steps.js";
import config from "../../../config/config.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import { invalid_dashboard } from "../../../data/dashboards/dashboard-test-body.js";
import _ from "lodash";
import { generateUpdateDashboardResponse } from "../../../data/dashboards/response.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";
import { errorSchema, messageSchema } from "../../../data/json-schemas.ts/common.shema.js";

const dashboardIds: number[] = [];

describe("[API] Dashboards - PUT method", () => {
  before(async () => {
    await LoginApiSteps.loginAsAdmin();
  });

  beforeEach(async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.projectName, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).toBe(STATUS_CODES.CREATED);
    dashboardIds.push(createDashboardResponse.data.id)
  })

  it("Update Dashboard with valid data", async () => {
    const dashboardData = generateNewDashboard();
    const dashboardId = dashboardIds[dashboardIds.length - 1]
    const updatedDashboardResponse = await DashboardsService.updateDashboard(dashboardData, dashboardId, config.projectName, LoggedInUsers.getToken());
    expect(updatedDashboardResponse.status).toBe(STATUS_CODES.OK);
    expect(updatedDashboardResponse.data).not.toBe(undefined);
    expect(updatedDashboardResponse.data.message).toBe(generateUpdateDashboardResponse(dashboardId))
    validateSchema(updatedDashboardResponse, messageSchema)
  });

  for (const dashboardData of invalid_dashboard) {
    it(`Update Dashboard with invalid data - ${dashboardData.testName}`, async () => {
      const dashboard = _.omit(dashboardData, "testName")
      const dashboardId = dashboardIds[dashboardIds.length - 1]
      const updatedDashboardResponse = await DashboardsService.updateDashboard(dashboard, dashboardId, config.projectName, LoggedInUsers.getToken());
      expect(updatedDashboardResponse.status).toBe(STATUS_CODES.INVALID_REQUEST);
      validateSchema(updatedDashboardResponse, errorSchema)
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