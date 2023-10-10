import { ICredentials } from "../../types/login.types.js";
import AllDashboardsPage from "../pages/dashboards/allDashboards.page.js";
import LoginPage from "../pages/login.page.js";

class LoginSteps {
    async login(credentials?: ICredentials) {
        await LoginPage.setValue(LoginPage["Login input"], credentials?.login || process.env!.LOGIN || "")
        await LoginPage.setValue(LoginPage["Password input"], credentials?.password || process.env.PASSWORD || "")
        await LoginPage.click(LoginPage["Login button"])
        await AllDashboardsPage.waitForElement(AllDashboardsPage["Signed message"])
    }
}

export default new LoginSteps()
