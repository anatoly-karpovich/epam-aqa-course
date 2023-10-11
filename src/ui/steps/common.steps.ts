import { logStep } from "../../utils/reporter/reporter.js"
import LoginPage from "../pages/login.page.js"

class CommonSteps {
    @logStep("Open Report Portal")
    async openReportPortal() {
        await LoginPage.openPage(process.env.ENVIRONMENT === "local" ? `http://localhost:${process.env.PORT || 8080}/ui/#login` : `https://rp.epam.com/ui/#login`)
    }    
}

export default new CommonSteps()

