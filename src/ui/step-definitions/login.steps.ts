import { When } from "@wdio/cucumber-framework"
import LoginSteps from "../steps/login.steps.js"

When(/^I login as admin$/, async function() {
    await LoginSteps.login()
})