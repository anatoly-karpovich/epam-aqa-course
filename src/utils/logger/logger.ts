import * as loggers from "./loggers/index.js";

const loggerClients = {
  winston: loggers.WinstonLogger
}

export default loggerClients[process.env.LOGGER || 'winston']
