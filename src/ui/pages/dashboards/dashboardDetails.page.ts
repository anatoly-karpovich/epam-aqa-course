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

  get ["Widgets container"]() {
    return `//div[@class="react-grid-layout"]`
  }

  get ["Widget by Name"]() {
    return (widgetName: string) => `${this["Widgets container"]}/div[.//*[.="${widgetName}"]]`
  }
}

export default new DashboardDetailsPage();
