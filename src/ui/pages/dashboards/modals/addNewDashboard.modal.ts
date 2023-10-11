import { DashboardsModal } from "./dashboards.modal.js";

class AddNewDashboardModal extends DashboardsModal {
    get ["Add button"]() {
        return `${this.uniqueElement()}//button[.="Add"]`
    }

    get ["Dashboard Name input"]() {
        return `${this.uniqueElement()}//input`
    }

    get ["Dashboard Description input"]() {
        return `${this.uniqueElement()}//textarea`
    }
}

export default new AddNewDashboardModal("Add New Dashboard")
