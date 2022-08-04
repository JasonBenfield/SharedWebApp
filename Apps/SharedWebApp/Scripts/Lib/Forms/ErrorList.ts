import { ErrorModel } from "../ErrorModel";

export class ErrorList implements IErrorList {
    private readonly errors: ErrorModel[] = [];

    add(error: ErrorModel) {
        this.errors.push(error);
    }

    merge(errors: IErrorList) {
        this.errors.push(...errors.values());
    }

    hasErrors() { return this.errors.length > 0; }

    values() { return this.errors; }
}