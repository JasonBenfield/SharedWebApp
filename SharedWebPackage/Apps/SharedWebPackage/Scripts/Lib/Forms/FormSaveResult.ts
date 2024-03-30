export class FormSaveResult<T> {
    constructor(
        readonly value: T,
        readonly errors: IErrorModel[]
    ) {
    }

    succeeded() {
        return this.errors.length === 0;
    }
}