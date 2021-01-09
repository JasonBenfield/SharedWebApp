import { ErrorModel } from "../../Shared/ErrorModel";
import { ConstraintResult } from "./ConstraintResult";
import { NotWhitespaceConstraint } from "./NotWhitespaceConstraint";

export class ConstraintCollection {
    private readonly constraints: IConstraint[] = [];

    private isNullAllowed: boolean = true;

    mustNotBeNull() {
        this.isNullAllowed = false;
    }

    private skipped: boolean = false;

    skipValidation() { this.skipped = true; }

    unskipValidation() { this.skipped = false; }

    add(constraint: IConstraint) {
        this.constraints.push(constraint);
    }

    validate(errors: IErrorList, field: IField) {
        if (!this.skipped) {
            let value = field.getValue();
            if (value === undefined || value === null) {
                if (!this.isNullAllowed) {
                    errors.add(new ErrorModel('Must not be null', field.getCaption(), field.getName()));
                }
            }
            else {
                for (let c of this.constraints) {
                    let result = c.test(value);
                    if (!result.isValid) {
                        errors.add(new ErrorModel(result.errorMessage, field.getCaption(), field.getName()));
                        return;
                    }
                }
            }
        }
    }
}

export class TextConstraintCollection extends ConstraintCollection {
    mustNotBeWhitespace(failureMessage: string) {
        this.add(new NotWhitespaceConstraint(failureMessage));
    }
}

export class DateConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: Date, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    }
    mustBeAbove(lowerValue: Date, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    }
    mustBeOnOrBelow(upperValue: Date, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    }
    mustBeBelow(upperValue: Date, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    }
}

export class NumberConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: number, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    }
    mustBeAbove(lowerValue: number, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    }
    mustBeOnOrBelow(upperValue: number, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    }
    mustBeBelow(upperValue: number, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    }
}


export class LowerRangeConstraint<T> implements IConstraint {
    constructor(
        private readonly boundValue: T,
        private readonly isIncluded: boolean,
        private readonly failureMessage: string
    ) {
    }

    test(value: T) {
        return this.isInRange(value)
            ? ConstraintResult.passed()
            : ConstraintResult.failed(this.failureMessage);
    }

    private isInRange(value: T) {
        if (this.boundValue === undefined || this.boundValue === null) {
            return true;
        }
        if (value > this.boundValue) {
            return true;
        }
        if (this.boundValue === value) {
            return this.isIncluded;
        }
        return false;
    }
}

export class UpperRangeConstraint<T> implements IConstraint {
    constructor(
        private readonly boundValue: T,
        private readonly isIncluded: boolean,
        private readonly failureMessage: string
    ) {
    }

    test(value: T) {
        return this.isInRange(value)
            ? ConstraintResult.passed()
            : ConstraintResult.failed(this.failureMessage);
    }

    private isInRange(value: T) {
        if (this.boundValue === undefined || this.boundValue === null) {
            return true;
        }
        if (value < this.boundValue) {
            return true;
        }
        if (this.boundValue === value) {
            return this.isIncluded;
        }
        return false;
    }
}