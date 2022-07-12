import { ErrorModel } from "../ErrorModel";
import { JoinedStrings } from "../JoinedStrings";
import { UrlBuilder } from "../UrlBuilder";
import { AppApiError } from "./AppApiError";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiView } from "./AppApiView";
import { AppResourceUrl } from "./AppResourceUrl";
import { ErrorFromHttpResult } from "./ErrorFromHttpResult";
import { HttpClient } from "./HttpClient";
import { ODataResult } from "./ODataResult";
import { ParsedDateObject } from "./ParsedDateObject";
import { WebPage } from "./WebPage";

interface IODataError {
    code: string;
    message: string;
    details: string[];
    innerError: IODataInnerError;
}

interface IODataInnerError {
    message: string;
    type: string;
    stacktrace: string;
}

export class AppApiQuery<TEntity> {
    private readonly resourceUrl: AppResourceUrl;

    constructor(
        private readonly events: AppApiEvents,
        resourceUrl: AppResourceUrl,
        readonly name: string
    ) {
        this.resourceUrl = resourceUrl;
    }

    url() {
        return new UrlBuilder(this.resourceUrl.url);
    }

    toExcel(odataQuery: string) {
        const url = this.url()
            .addPart('ToExcel')
            .addQueryString(odataQuery);
        new WebPage(url).openWindow();
    }

    async execute(data: string, errorOptions: IActionErrorOptions) {
        const url = this.url();
        url.addPart('$query');
        const postResult = await new HttpClient().post(
            url.value(),
            data,
            'text/plain'
        );
        let result: ODataResult<TEntity>;
        let apiError: AppApiError;
        let rawResult = postResult && postResult.result;
        if (postResult.isSuccessful()) {
            rawResult = new ParsedDateObject(rawResult).value;
            result = new ODataResult<TEntity>(rawResult.value, rawResult['@odata.count']);
        }
        else {
            const odataError = postResult.result && postResult.result.error;
            if (odataError) {
                const sourceError = <IODataError>odataError;
                const messageParts: string[] = [];
                if (sourceError.code) {
                    messageParts.push(sourceError.code);
                }
                if (sourceError.message) {
                    messageParts.push(sourceError.message);
                }
                if (sourceError.innerError) {
                    if (sourceError.innerError.message) {
                        messageParts.push(sourceError.innerError.message);
                    }
                    if (sourceError.innerError.type) {
                        messageParts.push(sourceError.innerError.type);
                    }
                    if (sourceError.innerError.stacktrace) {
                        messageParts.push(sourceError.innerError.stacktrace);
                    }
                }
                const message = new JoinedStrings('\r\n', messageParts).value();
                apiError = new AppApiError(
                    [
                        new ErrorModel(message)
                    ],
                    postResult.status,
                    'Get',
                    errorOptions.caption || ''
                );
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
        }
        return result;
    }

    toString() {
        return `AppApiQuery ${this.resourceUrl}`;
    }
}
