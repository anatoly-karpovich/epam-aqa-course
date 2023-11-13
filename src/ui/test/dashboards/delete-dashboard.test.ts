import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import LoginSteps from "../../steps/login.steps.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import SidebarSteps from "../../steps/sidebar.steps.js";
import DashboardDetailsSteps from "../../steps/dashboards/dashboardDetails.steps.js";
import DeleteDashboardSteps from "../../steps/dashboards/deleteDashboard.steps.js";

describe("Delete Dashboard", () => {
  let dashboard = generateNewDashboard();

  beforeEach(async () => {
    await LoginSteps.login();
    await AllDashboardsSteps.openAddNewDashboardModal();
    await AddNewDashboardSteps.submitNewDashboard(dashboard);
  });

  it("Delete created dashboard", async () => {
    await DashboardDetailsSteps.openDeleteDashboardModal();
    await DeleteDashboardSteps.deleteDashboard();
  });

  afterEach(async () => {
    await SidebarSteps.logout();
  });
});
