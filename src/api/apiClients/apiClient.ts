import AxiosApiClient from "./axiosApiClient.js"
import SuperagentApiClient from "./superagentApiClient.js"

const clients = {
  axios: AxiosApiClient,
  superagent: SuperagentApiClient
}

export default clients[process.env.API_CLIENT || 'axios']