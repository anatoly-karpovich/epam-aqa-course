import { NOTIFICATION_MESSAGES } from "../../../data/dashboards/dashboardsUi.js";
import { logStep } from "../../../utils/reporter/reporter.js";
import DeleteDashboardModal from "../../pages/dashboards/modals/deleteDashboard.modal.js";


class DeleteDashboardSteps {

  @logStep('Delete Dashboard from Delete Dashboard modal')
  async deleteDashboard() {
    await DeleteDashboardModal.click(DeleteDashboardModal["Delete button"]);
    await DeleteDashboardModal.checkNotificationWithText(NOTIFICATION_MESSAGES.DASHBOARD_DELETED)
  }
}

export default new DeleteDashboardSteps();
