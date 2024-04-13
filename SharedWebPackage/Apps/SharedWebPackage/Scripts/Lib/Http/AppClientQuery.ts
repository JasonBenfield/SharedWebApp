import { ErrorModel } from "../ErrorModel";
import { JoinedStrings } from "../JoinedStrings";
import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
import { AppClientError } from "./AppClientError";
import { AppClientEvents } from "./AppClientEvents";
import { AppResourceUrl } from "./AppResourceUrl";
import { ErrorFromHttpResult } from "./ErrorFromHttpResult";
import { HttpClient } from "./HttpClient";
import { ODataResult } from "./ODataResult";
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

export class AppClientQuery<TModel, TEntity> {
    private readonly resourceUrl: AppResourceUrl;
    private readonly excelUrl: Url;

    constructor(
        private readonly events: AppClientEvents,
        resourceUrl: AppResourceUrl,
        readonly name: string
    ) {
        this.resourceUrl = resourceUrl;
        this.excelUrl = AppResourceUrl.app(this.resourceUrl.path.app, this.resourceUrl.path.version, this.resourceUrl.path.modifier, pageContext.CacheBust)
            .withGroup(this.resourceUrl.path.group)
            .withAction('ToExcel')
            .url;
    }

    get path() { return this.resourceUrl.path; }

    url() {
        return new UrlBuilder(this.resourceUrl.url);
    }

    toExcel(odataQuery: string, model: TModel) {
        const url = new UrlBuilder(this.excelUrl)
            .addQueryString(odataQuery)
            .addQueryFromObject(model);
        new WebPage(url).openWindow();
    }

    async execute(odataQuery: string, model: TModel, errorOptions: IActionErrorOptions) {
        const url = this.url();
        url.addPart('$query');
        url.addQueryFromObject(model);
        const postResult = await new HttpClient().post(
            url.value(),
            odataQuery,
            'text/plain'
        );
        let result: ODataResult<TEntity>;
        let apiError: AppClientError;
        let rawResult = postResult && postResult.result;
        if (postResult.isSuccessful()) {
            result = new ODataResult<TEntity>(rawResult.value, rawResult['@odata.count']);
        }
        else if (typeof postResult.result === 'string') {
            apiError = new ErrorFromHttpResult(postResult, 'Get', errorOptions).value;
            if (apiError) {
                if (!errorOptions.preventDefault) {
                    this.events.handleError(apiError);
                }
                throw apiError;
            }
        }
        else if (postResult.result && postResult.result.Data) {
            apiError = new ErrorFromHttpResult(postResult, 'Get', errorOptions).value;
            if (apiError) {
                if (!errorOptions.preventDefault) {
                    this.events.handleError(apiError);
                }
                throw apiError;
            }
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
                apiError = new AppClientError(
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
