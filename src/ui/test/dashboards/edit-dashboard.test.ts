import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import LoginSteps from "../../steps/login.steps.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import SidebarSteps from "../../steps/sidebar.steps.js";
import DashboardDetailsSteps from "../../steps/dashboards/dashboardDetails.steps.js";
import EditDashboardSteps from "../../steps/dashboards/editDashboard.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";

describe("Edit Dashboard", () => {
  let dashboard = generateNewDashboard();

  beforeEach(async () => {
    await LoginSteps.login();
    await AllDashboardsSteps.openAddNewDashboardModal();
    await AddNewDashboardSteps.submitNewDashboard(dashboard);
  });

  it("Edit created dashboard with smoke data", async () => {
    await DashboardDetailsSteps.openEditDashboardModal();
    dashboard = generateNewDashboard();
    await EditDashboardSteps.updateDashboard(dashboard);
    const pageTitle = await DashboardDetailsPage.getText(DashboardDetailsPage.Title);
    expect(pageTitle).toBe(dashboard.name.toUpperCase());
  });

  afterEach(async () => {
    await SidebarSteps.logout();
  });
});
