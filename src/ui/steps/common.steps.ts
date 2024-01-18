import { logStep } from "../../utils/reporter/decorators.js";
import LoginPage from "../pages/login.page.js";
import { NOTIFICATION_MESSAGES } from "../../data/dashboards/dashboardsUi.js";
import type { PageContext } from "../../types/core/actions/baseActions.js";
import { PlaywightSetup } from "../../utils/playwight/playwightSetup.js";
import ENVIRONMENT from "../../config/environment.js";

class CommonSteps {
  @logStep("Open Report Portal")
  async openReportPortal(pageContext?: PageContext) {
    if (pageContext) {
      const setup = new PlaywightSetup();
      setup.setPage(pageContext.page);
    }
    await LoginPage.openPage(ENVIRONMENT.baseUrl);
  }

  async switchToProject(projectName?: string) {
    const project = projectName || ENVIRONMENT.PROJECT_NAME;
    const url = ENVIRONMENT.baseUrl + `ui/#${project}`;
    await LoginPage.openPage(url);
  }

  async skipNotificationMessage(message: NOTIFICATION_MESSAGES) {
    await LoginPage.checkNotificationWithText(message);
  }

  async waitForSpinnersToHide() {
    await LoginPage.waitForElementsArrayToBeDisplayed(LoginPage.Spinner, true);
  }
}

export default new CommonSteps();
