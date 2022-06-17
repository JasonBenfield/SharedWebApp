import { AppApiError } from "./AppApiError";
import { AppApiEvents } from "./AppApiEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { ErrorFromHttpResult } from "./ErrorFromHttpResult";
import { HttpClient } from "./HttpClient";
import { JsonText } from "./JsonText";
import { ParsedDateObject } from "./ParsedDateObject";

export class AppApiContent<TArgs,TResult> {
    private readonly resourceUrl: AppResourceUrl;

    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        actionName: string,
        readonly friendlyName: string
    ) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    async execute(data: TArgs, errorOptions: IActionErrorOptions) {
        let jsonText = new JsonText(data).toString();
        let postResult = await new HttpClient().post(this.resourceUrl.url.value(), jsonText);
        let result: TResult;
        let apiError: AppApiError;
        result = postResult && postResult.result;
        if (postResult.isSuccessful()) {
            if (typeof result === 'string') {
                if (ParsedDateObject.isDateString(result)) {
                    result = <any>new Date(Date.parse(result));
                }
            }
            else {
                result = new ParsedDateObject(result).value;
            }
        }
        else {
            apiError = new ErrorFromHttpResult(postResult, this.friendlyName, errorOptions).value;
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
        return `AppApiContent ${this.resourceUrl}`;
    }
}
