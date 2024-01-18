import commonSteps from "../../steps/common.steps.js";
import loginSteps from "../../steps/login.steps.js";
import AllDashboardsSteps from "../../steps/dashboards/allDashboards.steps.js";
import ENVIRONMENT from "../../../config/environment.js";
import describeFunctions from "../../../utils/testRunners/describesWrapper.js";
import dashboardDetailsSteps from "../../steps/dashboards/dashboardDetails.steps.js";

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
    await loginSteps.login();
    await AllDashboardsSteps.openDemoDashboardDetails();
    await commonSteps.waitForSpinnersToHide();
    await dashboardDetailsSteps.moveWidget("LAUNCH STATISTICS AREA", "TEST CASES GROWTH TREND CHART");
  });
});
