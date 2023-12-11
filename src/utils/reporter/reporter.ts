import allure from "./allure.js";
import allureMocha from "./allure-mocha.js";

const reporterServices = {
  wdio: allure,
  mocha: allureMocha
}

export default reporterServices[process.env.FRAMEWORK || 'wdio']