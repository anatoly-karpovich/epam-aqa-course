import { DEMO_DASHBOARD_DATA } from "../../../data/dashboards/dashboardsUi.js";
import { logStep } from "../../../utils/reporter/decorators.js";
import AllDashboardsPage from "../../pages/dashboards/allDashboards.page.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";
import AddNewDashboardModal from "../../pages/dashboards/modals/addNewDashboard.modal.js";
import EditDashboardModal from "../../pages/dashboards/modals/editDashboard.modal.js";

class AllDashboardsSteps {
  @logStep("Open Add New Dashboard modal")
  async openAddNewDashboardModal() {
    await AllDashboardsPage.click(AllDashboardsPage["Add New Dashboard button"]);
    await AllDashboardsPage.waitForElementAndScroll(AddNewDashboardModal.uniqueElement());
  }

  async openEditDashboardModal(dashboardName: number) {
    await AllDashboardsPage.click(AllDashboardsPage["Dashboard Edit in table by Dashboard Name button"](String(dashboardName)));
    await AllDashboardsPage.waitForElementAndScroll(EditDashboardModal.uniqueElement());
  }

  async openDemoDashboardDetails() {
    await AllDashboardsPage.click(AllDashboardsPage["Dashboard Name in table by Dashboard Name"](DEMO_DASHBOARD_DATA.name));
    await DashboardDetailsPage.waitForElementAndScroll(DashboardDetailsPage.uniqueElement);
  }
}

export default new AllDashboardsSteps();
