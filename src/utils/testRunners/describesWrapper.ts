import { test } from "@playwright/test";
import { describe as wdioDescribe, beforeEach as wdioBeforeEach, it as wdioIt, afterEach as wdioAfterEach } from "mocha";

const describeFunctions = {
  wdio: {
    describe: wdioDescribe,
    beforeEach: wdioBeforeEach,
    it: wdioIt,
    afterEach: wdioAfterEach,
  },
  playwright: {
    describe: test.describe,
    beforeEach: test.beforeEach,
    it: test,
    afterEach: test.afterEach,
  },
};

export default describeFunctions[process.env.FRAMEWORK || "wdio"];
