import { logStep } from "../../../utils/reporter/reporter.js";
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
}

export default new DashboardDetailsSteps();
