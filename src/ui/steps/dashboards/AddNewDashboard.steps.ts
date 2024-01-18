import { expect } from "chai";
import { apiConfig } from "../../../api/apiConfig.js";
import { NOTIFICATION_MESSAGES } from "../../../data/dashboards/dashboardsUi.js";
import type { INewDashboardUI } from "../../../types/dashboards/dashboards.types.js";
import { logStep } from "../../../utils/reporter/decorators.js";
import AddNewDashboardModal from "../../pages/dashboards/modals/addNewDashboard.modal.js";
import CommonSteps from "../common.steps.js";
import { STATUS_CODES } from "../../../data/http.js";
import ENVIRONMENT from "../../../config/environment.js";

class AddNewDashboardSteps {
  @logStep("Fill In Dashboards Data on Add Dashboards modal")
  async fillInNewDashboardData(newDashboard: INewDashboardUI) {
    await AddNewDashboardModal.setValue(AddNewDashboardModal["Dashboard Name input"], newDashboard.name);
    if (newDashboard.description) {
      await AddNewDashboardModal.setValue(AddNewDashboardModal["Dashboard Description input"], newDashboard.description);
    }
  }

  @logStep("Click on Save button on Add Dashboards modal")
  async clickSaveButton() {
    await AddNewDashboardModal.click(AddNewDashboardModal["Add button"]);
  }

  @logStep("Create new Dashboard on Add Dashboards modal")
  async submitNewDashboard(newDashboard: INewDashboardUI) {
    await this.fillInNewDashboardData(newDashboard);
    await this.clickSaveButton();
    await CommonSteps.skipNotificationMessage(NOTIFICATION_MESSAGES.DASHBOARD_ADDED);
  }

  async submitNewDashboardWithInterception(newDashboard: INewDashboardUI) {
    await this.fillInNewDashboardData(newDashboard);
    if (ENVIRONMENT.FRAMEWORK === "playwright") {
      const urlPattern = apiConfig.baseURL + apiConfig.endpoints.Dashboard(ENVIRONMENT.PROJECT_NAME) + "*";
      const responsePromise = AddNewDashboardModal.interceptResponse(urlPattern, this.clickSaveButton);
      const status = ((await responsePromise) as { status: () => number }).status();
      expect(status).to.eql(STATUS_CODES.CREATED);
    } else {
      //TODO: Implement WDIO intercept service
      await this.clickSaveButton();
    }

    await CommonSteps.skipNotificationMessage(NOTIFICATION_MESSAGES.DASHBOARD_ADDED);
  }
}

export default new AddNewDashboardSteps();
