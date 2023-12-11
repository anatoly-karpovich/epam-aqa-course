import { logStep } from "../../utils/reporter/decorators.js";
import LoginPage from "../pages/login.page.js";
import conf from "../../config/config.js";
import { NOTIFICATION_MESSAGES } from "../../data/dashboards/dashboardsUi.js";

class CommonSteps {
  @logStep("Open Report Portal")
  async openReportPortal() {
    await LoginPage.openPage(conf.baseUrl);
  }

  async skipNotificationMessage(message: NOTIFICATION_MESSAGES) {
    await LoginPage.checkNotificationWithText(message)
  }

  async waitForSpinnersToHide() {
    await LoginPage.waitForElementsArrayToBeDisplayed(LoginPage.Spinner, true)
  }
}

export default new CommonSteps();
