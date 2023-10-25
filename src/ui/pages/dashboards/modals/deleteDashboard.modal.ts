import { DashboardsModal } from "./dashboards.modal.js";

class DeleteDashboardModal extends DashboardsModal {
  get ["Delete button"]() {
    return `${this.uniqueElement()}//button[.="Delete"]`;
  }

  get ["Message"]() {
    return `${this.uniqueElement()}//p`;
  }
}

export default new DeleteDashboardModal("Delete Dashboard");
