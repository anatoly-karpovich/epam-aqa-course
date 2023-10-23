import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import CommonSteps from "../../steps/common.steps.js";
import LoginSteps from "../../steps/login.steps.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import SidebarSteps from "../../steps/sidebar.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";

describe("Create Dashboard", () => {
    beforeEach(async () => {
        await CommonSteps.openReportPortal();
    })

  it("Create dashboard with smoke data", async () => {
    await LoginSteps.login();
    await AllDashboardsSteps.openAddNewDashboardModal();
    const dashboard = generateNewDashboard();
    await AddNewDashboardSteps.submitNewDashboard(dashboard);
    const pageTitle = await DashboardDetailsPage.getText(DashboardDetailsPage.Title);
    expect(pageTitle).toBe(dashboard.name.toUpperCase())
  });
  
  afterEach(async () => {
    await SidebarSteps.logout();
  })
});
