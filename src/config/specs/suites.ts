const mocha_jasmine = {
  ui: ["../ui/**/*test.ts"]
}

const suites =  {
  cucumber: {
    ui: ["../ui/features/**/*.feature"]
  },
  mocha: mocha_jasmine,
  jasmine: mocha_jasmine
}

export default suites[process.env.TEST_RUNNER || "mocha"]