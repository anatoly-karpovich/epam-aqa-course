// export default {
//     credentials: {
//         login: process.env.ENVIRONMENT === "local" ? `${process.env.LOGIN_LOCAL}` : `${process.env.LOGIN_WEB}`,
//         password: process.env.ENVIRONMENT === "local" ? `${process.env.PASSWORD_LOCAL}` : `${process.env.PASSWORD_WEB}`
//     },
//     baseUrl: process.env.ENVIRONMENT === "local" ? `${process.env.URL_LOCAL}` : `${process.env.URL_PRODUCTION}`
// }

const conf = {
  local: {
    credentials: {
      login: process.env.LOGIN_LOCAL,
      password: process.env.PASSWORD_LOCAL,
    },
    baseUrl: process.env.URL_LOCAL,
  },

  web: {
    credentials: {
      login: process.env.LOGIN_WEB,
      password: process.env.PASSWORD_WEB,
    },
    baseUrl: process.env.URL_PRODUCTION,
  },
};
export default conf[process.env.ENVIRONMENT || "local"];
