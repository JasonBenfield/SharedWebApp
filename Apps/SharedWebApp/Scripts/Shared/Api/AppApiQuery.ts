import { UrlBuilder } from "../UrlBuilder";
import { AppApiError } from "./AppApiError";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { ErrorFromHttpResult } from "./ErrorFromHttpResult";
import { HttpClient } from "./HttpClient";
import { ODataResult } from "./ODataResult";
import { ParsedDateObject } from "./ParsedDateObject";

export class AppApiQuery<TEntity> {
    private readonly resourceUrl: AppResourceUrl;

    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl
    ) {
        this.resourceUrl = resourceUrl;
    }

    async execute(data: string, errorOptions: IActionErrorOptions) {
        let url = new UrlBuilder(this.resourceUrl.url);
        url.addQueryString(data);
        let postResult = await new HttpClient().post(
            url.value(),
            ''
        );
        let result: ODataResult<TEntity>;
        let apiError: AppApiError;
        let rawResult = postResult && postResult.result;
        if (postResult.isSuccessful()) {
            rawResult = new ParsedDateObject(rawResult).value;
            result = new ODataResult<TEntity>(rawResult.value, rawResult['@odata.count']);
        }
        else {
            apiError = new ErrorFromHttpResult(postResult, 'Get', errorOptions).value;
            if (apiError) {
                if (!errorOptions.preventDefault) {
                    this.events.handleError(apiError);
                }
                throw apiError;
            }
        }
        return result;
    }

    toString() {
        return `AppApiQuery ${this.resourceUrl}`;
    }
}
