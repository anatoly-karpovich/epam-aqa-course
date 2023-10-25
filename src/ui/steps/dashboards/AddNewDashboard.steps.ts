import { NOTIFICATION_MESSAGES } from "../../../data/dashboards/dashboardsUi.js";
import type { INewDashboardUI } from "../../../types/dashboards/addNewDashboard.types.js";
import { logStep } from "../../../utils/reporter/reporter.js";
import AddNewDashboardModal from "../../pages/dashboards/modals/addNewDashboard.modal.js";

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
    await AddNewDashboardModal.checkNotificationWithText(NOTIFICATION_MESSAGES.DASHBOARD_ADDED);
  }
}

export default new AddNewDashboardSteps();
