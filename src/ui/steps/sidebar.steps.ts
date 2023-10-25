import { logStep } from "../../utils/reporter/reporter.js";
import SidebarPage from "../pages/sidebar/sidebar.page.js";

class SidebarSteps {
  @logStep("Logout from Report Portal")
  async logout() {
    await SidebarPage.click(SidebarPage["User Menu button"]);
    await SidebarPage.click(SidebarPage.userMenuModal["Logout button"]);
  }
}

export default new SidebarSteps();
