class CommonSteps {
    async openReportPortal() {
        await browser.url(process.env.ENVIRONMENT === "local" ? `http://localhost:${process.env.PORT || 8080}/ui/#login` : `https://rp.epam.com/ui/#login`)
    }    
}

export default new CommonSteps()

