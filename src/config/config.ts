export default {
    credentials: {
        login: process.env.ENVIRONMENT === "local" ? `${process.env.LOGIN_LOCAL}` : `${process.env.LOGIN_WEB}`,
        password: process.env.ENVIRONMENT === "local" ? `${process.env.PASSWORD_LOCAL}` : `${process.env.PASSWORD_WEB}`
    },
    baseUrl: process.env.ENVIRONMENT === "local" ? `${process.env.URL_LOCAL}` : `${process.env.URL_PRODUCTION}`
}