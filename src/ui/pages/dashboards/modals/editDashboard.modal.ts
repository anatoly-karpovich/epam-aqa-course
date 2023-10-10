import { DashboardsModal } from "./dashboards.modal.js";

class EditDashboardModal extends DashboardsModal {
    get ["Update button"]() {
        return `${this.uniqueElement()}//button[.="Update"]`
    }

    get ["Dashboard Name input"]() {
        return `${this.uniqueElement()}//input`
    }

    get ["Dashboard Description input"]() {
        return `${this.uniqueElement()}//textarea`
    }
}

export default new EditDashboardModal("Edit Dashboard");
