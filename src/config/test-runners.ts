export const test_runners = {
    mocha: {
        framework: 'mocha',
        mochaOpts: {
            ui: 'bdd',
            timeout: 60000
        },
    },
    jasmine: {
        framework: 'jasmine',
        jasmineOpts: {
            defaultTimeoutInterval: 60000,
        },
    }
}
