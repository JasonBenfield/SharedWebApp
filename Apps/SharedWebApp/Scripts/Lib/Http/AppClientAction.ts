import { AppClientError } from "./AppClientError";
import { AppClientEvents } from "./AppClientEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { ErrorFromHttpResult } from "./ErrorFromHttpResult";
import { HttpClient } from "./HttpClient";
import { ParsedString } from "./ParsedString";

export class AppClientAction<TArgs, TResult> {
    private resourceUrl: AppResourceUrl;

    constructor(
        private readonly events: AppClientEvents,
        resourceUrl: AppResourceUrl,
        actionName: string,
        readonly friendlyName: string
    ) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    withModifier(modifier: string) {
        this.resourceUrl = this.resourceUrl.withModifier(modifier);
    }

    get path() { return this.resourceUrl.path; }

    async execute(data: TArgs, errorOptions: IActionErrorOptions) {
        const postResult = await new HttpClient().post(this.resourceUrl.url.value(), data);
        let result: TResult;
        let apiError: AppClientError;
        result = postResult && postResult.result && postResult.result.Data;
        if (postResult.isSuccessful()) {
            if (typeof result === 'string') {
                result = new ParsedString(result).value;
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
        return `AppApiAction ${this.resourceUrl}`;
    }
}
