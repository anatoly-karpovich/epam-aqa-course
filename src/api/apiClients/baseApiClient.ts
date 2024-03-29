import fieldsToHideInReport from "../../data/fieldsToHideInReport.js";
import { IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import { Logger } from "../../utils/logger/loggers/baseLogger.js";
import { hideValueInObject } from "../../utils/object/index.js";
import { BaseReporter } from "../../utils/reporter/baseReporter.js";

export abstract class BaseApiClient {
  protected response;
  protected options: IRequestOptions | null;
  protected request;

  /**
   * Creates static instance of request, e.g. this.request = axios.create()
   */
  protected abstract createRequestInstance(): void;

  /**
   * Transforms requestOptions from IRequestOptions to satisfy the api client options type based on the requestType field of requestOptions
   */
  protected abstract transformRequestOptions(): void;

  /**
   * Transforms response to IResponse
   */
  protected abstract transformResponse(): void;

  /**
   * Sends request with provided options
   */
  protected abstract send(): Promise<object>;

  /**
   * Logs api errors to console
   * @param error error from your api client
   */
  protected abstract logError(error: any): void;

  constructor(private reporterService: BaseReporter, private loggerService: Logger) {
    this.options = null;
  }

  /**
   * Sends request with provided request IRequestOptions and returns response as IResponse interface
   * @param initOptions Request options like url, method and etc from IRequestOptions interface
   * @returns
   */
  async sendRequest<T>(initOptions: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.options = initOptions;
      if (!this.options) throw new Error(`Request options were not provided`);
      this.createRequestInstance();
      this.transformRequestOptions();
      this.response = await this.send();
      this.transformResponse();
    } catch (error: any) {
      if (error.response) this.logError(error);
      if (this.response.status >= 500) {
        throw new Error(`Failed to send request. Reason:\n ${(error as Error).message}`, { cause: error });
      }
      this.transformResponse();
    } finally {
      this.secureCheck();
      this.logRequest();
    }
    return this.response;
  }

  private secureCheck() {
    fieldsToHideInReport.forEach((f) => this.options && hideValueInObject(this.options, f));
  }

  private logRequest() {
    this.reporterService.reportApiRequest(this.options!, this.response);
    this.loggerService.logApiRequest(JSON.stringify(this.options));
    this.loggerService.logApiResponse(JSON.stringify(this.response));
  }
}
