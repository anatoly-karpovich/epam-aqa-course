import { DashboardsPage } from "./dashboards.page.js";
import DeleteDashboardModal from "./modals/deleteDashboard.modal.js";
import EditDashboardModal from "./modals/editDashboard.modal.js";

class DashboardDetailsPage extends DashboardsPage {

    editDashboardModal = EditDashboardModal;
    deleteDashboardModal = DeleteDashboardModal;

    get ['Title']() {
        return `ul li:last-child span`
    }

    get ['Edit button']() {
        return `//button[./span[.="Edit"]]`
    }

    get ['Delete button']() {
        return `//button[./span[.="Delete"]]`
    }
}

export default new DashboardDetailsPage();