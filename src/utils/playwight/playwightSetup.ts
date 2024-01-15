import { Browser, Page } from "@playwright/test";

export class PlaywightSetup {
  private static page: Page;
  public static browser: Browser;

  setPage(page: Page): void {
    PlaywightSetup.page = page;
  }

  getPage(): Page {
    return PlaywightSetup.page;
  }
}
