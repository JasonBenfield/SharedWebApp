export class ConstraintResult implements IConstraintResult {
    static passed() { return new ConstraintResult(true, ""); }
    static failed(errorMessage: string) { return new ConstraintResult(false, errorMessage); }

    private constructor(isValid: boolean, errorMessage: string) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }

    readonly isValid: boolean;
    readonly errorMessage: string;
}