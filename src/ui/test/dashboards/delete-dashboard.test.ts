import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import LoginSteps from "../../steps/login.steps.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import SidebarSteps from "../../steps/sidebar.steps.js";
import DashboardDetailsSteps from "../../steps/dashboards/dashboardDetails.steps.js";
import DeleteDashboardSteps from "../../steps/dashboards/deleteDashboard.steps.js";
import CommonSteps from "../../steps/common.steps.js";
import describeFunctions from "../../../utils/testRunners/describesWrapper.js";
import ENVIRONMENT from "../../../config/environment.js";

const { describe, beforeEach, it, afterEach } = describeFunctions;

describe("[UI] Delete Dashboard", () => {
  let dashboard = generateNewDashboard();

  if (ENVIRONMENT.FRAMEWORK === "playwright") {
    beforeEach(async ({ page }) => {
      await CommonSteps.openReportPortal({ page });
      await LoginSteps.login();
      await AllDashboardsSteps.openAddNewDashboardModal();
      await AddNewDashboardSteps.submitNewDashboard(dashboard);
    });
  } else {
    beforeEach(async () => {
      await CommonSteps.openReportPortal();
      await LoginSteps.login();
      await AllDashboardsSteps.openAddNewDashboardModal();
      await AddNewDashboardSteps.submitNewDashboard(dashboard);
    });
  }

  it("Delete created dashboard", async () => {
    await DashboardDetailsSteps.openDeleteDashboardModal();
    await DeleteDashboardSteps.deleteDashboard();
  });

  afterEach(async () => {
    await SidebarSteps.logout();
  });
});
