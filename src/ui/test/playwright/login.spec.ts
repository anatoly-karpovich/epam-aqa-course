import { test, expect } from "@playwright/test";
import config from "../../../config/environment.js";
import allDashboardsPage from "../../pages/dashboards/allDashboards.page.js";
import commonSteps from "../../steps/common.steps.js";
import loginSteps from "../../steps/login.steps.js";
import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import { generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";
import AddNewDashboardModal from "../../pages/dashboards/modals/addNewDashboard.modal.js";

test.describe("[UI] Create Dashboard", async () => {
  test.beforeEach(async ({ page }) => {
    await commonSteps.openReportPortal({ page });
  });

  test("Create dashboard with smoke data", async ({ page }) => {
    await loginSteps.login(config.credentials);
    await expect(page.locator(allDashboardsPage["Title"])).toBeVisible();
    await AllDashboardsSteps.openAddNewDashboardModal();
    await AddNewDashboardModal.resizeElement(AddNewDashboardModal["Dashboard Description input"], { xOffset: 0, yOffset: 100 });
    const dashboard = generateNewDashboard();
    await AddNewDashboardSteps.submitNewDashboard(dashboard);
    const pageTitle = await DashboardDetailsPage.getText(DashboardDetailsPage.Title);
    expect(pageTitle).toBe(dashboard.name.toUpperCase());
  });
});
