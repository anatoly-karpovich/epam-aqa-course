import { IRequestOptions } from "../../types/api/apiClient.types.js";
import apiClient from "../apiClients/apiClient.js";

class SlackService {
  async postNotification(text: string) {
    const options: IRequestOptions = {
      method: "post",
      baseURL: `https://hooks.slack.com/`,
      url: `services/T06EVE3FN3C/B06FJ7SQ12L/Iwz87vhYT4qga3CTy5A4QzME`,
      headers: {
        "Content-type": "application/json",
      },
      data: { text },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }
}

export default new SlackService();
