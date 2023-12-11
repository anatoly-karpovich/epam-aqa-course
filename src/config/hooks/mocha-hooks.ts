import { HookFunctionExtension } from "@wdio/cucumber-framework/build/types";
import type { Services } from '@wdio/types';
import Logger from '../../utils/logger/logger.js';


export const mocha_hooks: HookFunctionExtension & Services.Hooks = {
   /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
  /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    Logger.sendLogsToReport();
    if (!passed) {
      await browser.takeScreenshot();
    }
},
}