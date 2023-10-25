import { BasePage } from "../basePage.page.js";
import UserModalModal from "./modal/userModal.modal.js";

class SideBarPage extends BasePage {
  userMenuModal = UserModalModal;
  sidebarContainer = `aside`;

  getSidebarButtonSelectorByText(buttonText: string) {
    return `${this.sidebarContainer} a[href*="/${buttonText}"]`;
  }

  get ["User Menu button"]() {
    return `//div[./img]`;
  }
}

export default new SideBarPage();
