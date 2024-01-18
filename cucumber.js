const config = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    dryRun: false,
    paths: ["./src/ui/features/**/*.feature"],
    require: ["./dist/ui/step-definitions/**/*.js"],
    // requireModule: ["ts-node/register"],
    format: ["html:test-results/cucumber-report.html"],
  },
};

export default config;
