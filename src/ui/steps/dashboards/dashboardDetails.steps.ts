import { logStep } from "../../../utils/reporter/decorators.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";

class DashboardDetailsSteps {
  @logStep("Open Edit Dashboard modal")
  async openEditDashboardModal() {
    await DashboardDetailsPage.click(DashboardDetailsPage["Edit button"]);
  }

  @logStep("Open Delete Dashboard modal")
  async openDeleteDashboardModal() {
    await DashboardDetailsPage.click(DashboardDetailsPage["Delete button"]);
  }

  async moveWidget(widgetToMove: string, widgetToBeReplaced: string) {
    const widgetToMoveSelector = DashboardDetailsPage["Widget by Name"](widgetToMove);
    const widgetToBeReplacedSelector = DashboardDetailsPage["Widget by Name"](widgetToBeReplaced);
    await DashboardDetailsPage.dragAndDrop(widgetToMoveSelector, widgetToBeReplacedSelector);
  }
}

export default new DashboardDetailsSteps();
