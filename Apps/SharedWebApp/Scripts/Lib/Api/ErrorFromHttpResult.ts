import { MappedArray } from "../Enumerable";
import { ErrorModel } from "../ErrorModel";
import { AppApiError } from "./AppApiError";
import { HttpPostResult } from "./HttpClient";

export class ErrorFromHttpResult {
    constructor(postResult: HttpPostResult, friendlyName: string, errorOptions: IActionErrorOptions) {
        let errors: ErrorModel[] = [];

        let result = postResult && postResult.result;
        if (result.Data) {
            result = result.Data;
        }
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
        this.value = new AppApiError(
            errors,
            postResult.status,
            friendlyName,
            errorOptions.caption || ''
        );
    }

    readonly value: AppApiError;
}