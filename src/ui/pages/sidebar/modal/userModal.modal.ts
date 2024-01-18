import { BasePage } from "../../basePage/basePage.page.js";

class UserMenuModal extends BasePage {
  get ["Profile button"]() {
    return `a[href="#userProfile"]`;
  }

  get ["Administrate button"]() {
    return `a[href="#administrate"]`;
  }

  get ["Api button"]() {
    return `a[href="#api"]`;
  }

  get ["Logout button"]() {
    return `//div[text()="Logout"]`;
  }
}

export default new UserMenuModal();
