import { DashboardsPage } from "./dashboards.page.js";
import DeleteDashboardModal from "./modals/deleteDashboard.modal.js";
import EditDashboardModal from "./modals/editDashboard.modal.js";

class DashboardDetailsPage extends DashboardsPage {
  "Edit Dashboard" = EditDashboardModal;
  "Delete Dashboard" = DeleteDashboardModal;
  uniqueElement = this.Title

  get ["Title"]() {
    return `ul li:last-child span`;
  }

  get ["Edit button"]() {
    return `//button[./span[.="Edit"]]`;
  }

  get ["Delete button"]() {
    return `//button[./span[.="Delete"]]`;
  }
}

export default new DashboardDetailsPage();
