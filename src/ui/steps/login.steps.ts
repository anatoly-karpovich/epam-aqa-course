import type { ICredentials } from "../../types/login.types.js";
import { logStep } from "../../utils/reporter/decorators.js";
import LoginPage from "../pages/login.page.js";
import conf from "../../config/config.js";
import { NOTIFICATION_MESSAGES } from "../../data/dashboards/dashboardsUi.js";
import CommonSteps from "./common.steps.js";

class LoginSteps {
  @logStep("Login to Report Portal")
  async login(credentials?: ICredentials) {
    await LoginPage.setValue(LoginPage["Login input"], credentials?.username || conf.credentials.username);
    await LoginPage.setValue(LoginPage["Password input"], credentials?.password || conf.credentials.password, { isSecretValue: true });
    await LoginPage.click(LoginPage["Login button"]);
    await CommonSteps.skipNotificationMessage(NOTIFICATION_MESSAGES.SIGNED_IN);
  }
}

export default new LoginSteps();
