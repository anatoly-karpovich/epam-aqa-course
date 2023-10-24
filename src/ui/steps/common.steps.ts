import { logStep } from "../../utils/reporter/reporter.js"
import LoginPage from "../pages/login.page.js"
import conf from "../../config/config.js"

class CommonSteps {
    @logStep("Open Report Portal")
    async openReportPortal() {
        await LoginPage.openPage(conf.baseUrl)
    }
    
    async skipNotificationMessage(message?: string) {
        await LoginPage.click(LoginPage["Notification message"](message))
        await LoginPage.waitForElement(LoginPage["Notification message"](message), true)
    }
}

export default new CommonSteps()

