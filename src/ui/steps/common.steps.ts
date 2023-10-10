class CommonSteps {
    async openReportPortal(port?: number) {
        await browser.url(`http://localhost:${port || process.env.PORT}/ui/#login`)
    }    
}

export default new CommonSteps()

