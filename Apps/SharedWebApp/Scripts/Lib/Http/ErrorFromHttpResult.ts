import { ErrorModel } from "../ErrorModel";
import { AppClientError } from "./AppClientError";
import { HttpPostResult } from "./HttpClient";

export class ErrorFromHttpResult {
    constructor(postResult: HttpPostResult, friendlyName: string, errorOptions: IActionErrorOptions) {
        let errors: ErrorModel[] = [];
        let result = postResult && postResult.result;
        if (result.Data) {
            result = result.Data;
        }
        if (result && typeof result !== 'string') {
            let rawErrors: IErrorModel[];
            if (result.Errors) {
                rawErrors = result.Errors;
            }
            else {
                rawErrors = <IErrorModel[]><any>result;
            }
            errors = rawErrors.map(e => new ErrorModel(e.Message, e.Caption, e.Source));
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
        this.value = new AppClientError(
            errors,
            postResult.status,
            friendlyName,
            errorOptions.caption || ''
        );
    }

    readonly value: AppClientError;
}