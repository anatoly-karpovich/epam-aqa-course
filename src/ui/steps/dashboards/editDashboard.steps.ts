import type { INewDashboardUI } from "../../../types/dashboards/addNewDashboard.types.js";
import { logStep } from "../../../utils/reporter/reporter.js";
import EditDashboardModal from "../../pages/dashboards/modals/editDashboard.modal.js";

class EditDashboardSteps {
    
  @logStep('Fill In Dashboards Data on Edit Dashboards modal')
  async fillInDashboardData(newDashboard: INewDashboardUI) {
    await EditDashboardModal.setValue(EditDashboardModal["Dashboard Name input"], newDashboard.name);
    if (newDashboard.description) {
      await EditDashboardModal.setValue(EditDashboardModal["Dashboard Description input"], newDashboard.description);
    }
  }

  @logStep('Click on Update button on Edit Dashboard modal')
  async clickUpdateButton() {
    await EditDashboardModal.click(EditDashboardModal["Update button"]);
  }

  @logStep('Update Dashboard on Edit Dashboards modal')
  async updateDashboard(newDashboard: INewDashboardUI) {
    await this.fillInDashboardData(newDashboard);
    await this.clickUpdateButton();
  }
}

export default new EditDashboardSteps();
