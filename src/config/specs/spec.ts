const mocha_jasmine = ["../**/*test.ts"];

const spec =  {
  cucumber: ["../**/*.feature"],
  mocha: mocha_jasmine,
  jasmine: mocha_jasmine
}

export default spec[process.env.TEST_RUNNER || "mocha"]