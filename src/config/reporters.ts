export default  [
    "spec",
    [
      "allure",
      {
        outputDir: './src/report/allure-results',
        disableWebdriverStepsReporting: true,
        disableMochaHooks: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: process.env.TEST_RUNNER === 'cucumber',
        reportedEnvironmentVars: {
          test_runner: process.env.TEST_RUNNER,
          environment: process.env.ENVIRONMENT
      }
      },
    ],
  ]
