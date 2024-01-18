import { BasePage } from "./basePage/basePage.page.js";

class LoginPage extends BasePage {
  uniqueElement = this["Login button"];
  get ["Login input"]() {
    return `input[name="login"]`;
  }

  get ["Password input"]() {
    return `input[name="password"]`;
  }

  get ["Login button"]() {
    return `button[type="submit"]`;
  }

  get ["Forgot Password link"]() {
    return `a[href="#login?forgotPass=true"]`;
  }
}

export default new LoginPage();
