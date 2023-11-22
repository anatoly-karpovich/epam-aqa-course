import AxiosApiClient from "./axios.js"
import SuperagentApiClient from "./superagent.js"

const clients = {
  axios: AxiosApiClient,
  superagent: SuperagentApiClient
}

export default clients[process.env.API_CLIENT || 'axios']