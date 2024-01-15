import allure from "./allure.js";

const reporterServices = {
  wdio: allure,
};

export default reporterServices[process.env.FRAMEWORK || "wdio"];
