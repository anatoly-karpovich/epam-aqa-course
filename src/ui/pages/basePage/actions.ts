import { WdioActions } from "./wdio.actions.js";
import { PlaywrightActions } from "./playwright.actions.js";

const actions = {
  wdio: WdioActions,
  playwright: PlaywrightActions,
};

export default actions[process.env.FRAMEWORK || "wdio"];
