import { HttpClient } from "./HttpClient";
import { JsonText } from "./JsonText";
import { AppApiEvents } from "./AppApiEvents";
import { AppApiError } from "./AppApiError";
import { ErrorModel } from "./ErrorModel";
import { AppResourceUrl } from "./AppResourceUrl";
import { MappedArray } from './Enumerable';

export class AppApiAction<TArgs,TResult> {
    private readonly resourceUrl: AppResourceUrl;

    private static dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.?\d{0,7}[\+\-]\d{2}:\d{2})?$/;

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
        result = postResult && postResult.result && postResult.result.Data;
        if (postResult.isSuccessful()) {
            if (typeof result === 'string') {
                if (AppApiAction.dateRegex.test(result)) {
                    result = <any>new Date(Date.parse(result));
                }
            }
            else {
                this.parseDates(result);
            }
        }
        else {
            let errors: ErrorModel[] = [];
            if (result) {
                let rawErrors = <IErrorModel[]><any>result;
                errors = new MappedArray(
                    rawErrors,
                    e => new ErrorModel(e.Message, e.Caption, e.Source)
                ).value();
            }
            else if (postResult.status === 404) {
                errors = [new ErrorModel('Not Found', '', '', this)];
            }
            else if (postResult.status === 401) {
                errors = [new ErrorModel('Not Authenticated', '', '', this)];
            }
            else if (postResult.status === 403) {
                errors = [new ErrorModel('Not Authorized', '', '', this)];
            }
            else {
                let message = 'An error occurred';
                if (postResult.status !== 500) {
                    message += ` (${postResult.status})`;
                }
                errors = [new ErrorModel(message, '', '', this)];
            }
            apiError = new AppApiError(
                errors,
                postResult.status,
                this.friendlyName,
                errorOptions.caption || ''
            );
        }
        if (apiError) {
            if (!errorOptions.preventDefault) {
                this.events.handleError(apiError);
            }
            throw apiError;
        }
        return result;
    }

    private parseDates(obj: any) {
        if (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (let i = 0; i < obj.length; i++) {
                    let el = obj[i];
                    if (typeof el === 'string') {
                        if (AppApiAction.dateRegex.test(el)) {
                            obj[i] = new Date(Date.parse(el));
                        }
                    }
                    else {
                        this.parseDates(el);
                    }
                }
            }
            else if (typeof (obj) !== 'string' && typeof (obj) !== 'boolean' && typeof (obj) !== 'number') {
                for (let prop in obj) {
                    if (prop) {
                        let value = obj[prop];
                        if (typeof value === 'string') {
                            if (AppApiAction.dateRegex.test(value)) {
                                obj[prop] = new Date(Date.parse(value));
                            }
                        }
                        else {
                            this.parseDates(value);
                        }
                    }
                }
            }
        }
        return obj;
    }

    toString() {
        return `AppApiAction ${this.resourceUrl}`;
    }
}
