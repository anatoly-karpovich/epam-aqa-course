import LoginSteps from "../steps/login.steps.js";
import cucumberMethods from "../../utils/testRunners/cucumberWrapper.js";

const { When } = cucumberMethods;

When(/^I login as admin$/, async function () {
  await LoginSteps.login();
});
