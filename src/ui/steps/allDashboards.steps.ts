import { logStep } from "../../utils/reporter/reporter.js";
import AllDashboardsPage from "../pages/dashboards/allDashboards.page.js";
import AddNewDashboardModal from "../pages/dashboards/modals/addNewDashboard.modal.js";

class AllDashboardsSteps {
    @logStep('Open Add New Dashboard modal')
    async openAddNewDashboardModal() {
        await AllDashboardsPage.click(AllDashboardsPage["Add New Dashboard button"]);
        await AllDashboardsPage.waitForElementAndScroll(AddNewDashboardModal.uniqueElement())
    }
}

export default new AllDashboardsSteps();