import { ConstraintResult } from "./ConstraintResult";

export class NotWhitespaceConstraint implements IConstraint {
    constructor(private readonly failureMessage) {
    }

    test(value: string) {
        if (/^\s*$/.test(value)) {
            return ConstraintResult.failed(this.failureMessage);
        }
        return ConstraintResult.passed();
    }
}