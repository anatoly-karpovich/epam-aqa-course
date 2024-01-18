import commonSteps from "../../steps/common.steps.js";
import loginSteps from "../../steps/login.steps.js";
import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";
import AddNewDashboardModal from "../../pages/dashboards/modals/addNewDashboard.modal.js";
import { expect } from "chai";
import ENVIRONMENT from "../../../config/environment.js";
import describeFunctions from "../../../utils/testRunners/describesWrapper.js";

const { describe, beforeEach, it } = describeFunctions;

describe("[UI] Create Dashboard", async () => {
  if (ENVIRONMENT.FRAMEWORK === "playwright") {
    beforeEach(async ({ page }) => {
      await commonSteps.openReportPortal({ page });
    });
  } else {
    beforeEach(async () => {
      await commonSteps.openReportPortal();
    });
  }

  it("Create dashboard with smoke data", async () => {
    await loginSteps.login(ENVIRONMENT.credentials);
    await commonSteps.switchToProject();
    await AllDashboardsSteps.openAddNewDashboardModal();
    await AddNewDashboardModal.resizeElement(AddNewDashboardModal["Dashboard Description input"], { xOffset: 0, yOffset: 100 });
    const dashboard = generateNewDashboard();
    await AddNewDashboardSteps.submitNewDashboardWithInterception(dashboard);
    const pageTitle = await DashboardDetailsPage.getText(DashboardDetailsPage.Title);
    expect(pageTitle).to.equal(dashboard.name.toUpperCase());
  });
});
