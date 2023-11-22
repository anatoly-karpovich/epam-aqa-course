import DashboardApiSteps from "../../steps/dashboardApi.steps.js";
import LoginApiSteps from "../../steps/loginApi.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import { STATUS_CODES } from "../../../data/http.js";
import DashboardsService from "../../services/dashboards.service.js";
import config from "../../../config/config.js";
import LoggedInUsers from "../../../utils/entities/loggedInUsers.js";
import { validateSchema } from "../../../utils/validations/validate-json-schema.js";
import { allDashboardsSchema, dashboardSchema } from "../../../data/json-schemas.ts/dashboard.schema.js";
import { errorSchema } from "../../../data/json-schemas.ts/common.shema.js";

const dashboardIds: number[] = [];

describe("[API] Dashboards - GET method", () => {
  before(async () => {
    await LoginApiSteps.loginAsAdmin();
  });

  it("Get existing dashboard", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.projectName, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).toBe(STATUS_CODES.CREATED);
    const dashboardId = createDashboardResponse.data.id;
    dashboardIds.push(dashboardId);

    const getDashboardResponse = await DashboardsService.getDashboardById(config.projectName, dashboardId, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).toBe(200);
    expect(createDashboardResponse.data).not.toBe(undefined);
    validateSchema(getDashboardResponse, dashboardSchema)
  });

  it("Get all dashboards", async () => {
    const dashboardData = generateNewDashboard();
    const createDashboardResponse = await DashboardsService.createDashboard(dashboardData, config.projectName, LoggedInUsers.getToken());
    expect(createDashboardResponse.status).toBe(STATUS_CODES.CREATED);
    const dashboardId = createDashboardResponse.data.id;
    dashboardIds.push(dashboardId);

    const getDashboardResponse = await DashboardsService.getAllDashboards(config.projectName, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).toBe(STATUS_CODES.OK);
    expect(createDashboardResponse.data).not.toBe(undefined);
    expect(getDashboardResponse.data.content.length).toBeGreaterThan(0);
    validateSchema(getDashboardResponse, allDashboardsSchema)
  });

  it("Get not existing dashboard", async () => {
    const getDashboardResponse = await DashboardsService.getDashboardById(config.projectName, 0, LoggedInUsers.getToken());
    expect(getDashboardResponse.status).toBe(STATUS_CODES.NOT_FOUND);
    validateSchema(getDashboardResponse, errorSchema)
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
