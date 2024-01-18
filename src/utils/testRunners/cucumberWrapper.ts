import { Given as givenWdio, When as whenWdio, Then as thenWdio, DataTable as dataTableWdio } from "@wdio/cucumber-framework";
import { Given as givenPlaywright, When as whenPlaywright, Then as thenPlaywright, DataTable as dataTablePlaywright } from "@cucumber/cucumber";
import ENVIRONMENT from "../../config/environment.js";

const cucumberWrapper = {
  wdio: {
    Given: givenWdio,
    When: whenWdio,
    Then: thenWdio,
    DataTable: dataTableWdio,
  },
  playwright: {
    Given: givenPlaywright,
    When: whenPlaywright,
    Then: thenPlaywright,
    DataTable: dataTablePlaywright,
  },
};

export default cucumberWrapper[ENVIRONMENT.FRAMEWORK || "wdio"];
