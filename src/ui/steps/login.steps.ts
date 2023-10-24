import type { ICredentials } from "../../types/login.types.js";
import { logStep } from "../../utils/reporter/reporter.js";
import LoginPage from "../pages/login.page.js";
import conf from "../../config/config.js";
import { NOTIFICATION_MESSAGES } from "../../data/dashboards/dashboardsUi.js";

class LoginSteps {
  @logStep("Login to Report Portal")
  async login(credentials?: ICredentials) {
    await LoginPage.setValue(LoginPage["Login input"], credentials?.login || conf.credentials.login);
    await LoginPage.setValue(LoginPage["Password input"], credentials?.password || conf.credentials.password, { isSecretValue: true });
    await LoginPage.click(LoginPage["Login button"]);
    await LoginPage.checkNotificationWithText(NOTIFICATION_MESSAGES.SIGNED_IN)
  }
}

export default new LoginSteps();
