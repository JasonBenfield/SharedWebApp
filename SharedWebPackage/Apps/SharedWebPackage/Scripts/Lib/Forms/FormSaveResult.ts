export class FormSaveResult<T> {
    constructor(
        readonly value: T | null,
        readonly errors: IErrorModel[]
    ) {
    }

    succeeded() {
        return this.errors.length === 0;
    }
}