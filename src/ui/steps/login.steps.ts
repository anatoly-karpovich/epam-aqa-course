import type { ICredentials } from "../../types/login.types.js";
import { logStep } from "../../utils/reporter/reporter.js";
import AllDashboardsPage from "../pages/dashboards/allDashboards.page.js";
import LoginPage from "../pages/login.page.js";

class LoginSteps {
    @logStep("Login to Report Portal")
    async login(credentials?: ICredentials) {
        const login = process.env.ENVIRONMENT === "local" ? process.env.LOGIN_LOCAL : process.env.LOGIN_WEB
        const password = process.env.ENVIRONMENT === "local" ? process.env.PASSWORD_LOCAL : process.env.PASSWORD_WEB
        await LoginPage.setValue(LoginPage["Login input"], credentials?.login || login || "")
        await LoginPage.setValue(LoginPage["Password input"], credentials?.password || password || "")
        await LoginPage.click(LoginPage["Login button"])
        await AllDashboardsPage.waitForElement(AllDashboardsPage["Signed message"])
    }
}

export default new LoginSteps();
