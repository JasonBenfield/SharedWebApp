import { DateOnly } from "../DateOnly";
import { DateTimeOffset } from "../DateTimeOffset";
import { ErrorModel } from "../ErrorModel";
import { TimeOnly } from "../TimeOnly";
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
            const value = field.getValue();
            if (value === undefined || value === null) {
                if (!this.isNullAllowed) {
                    errors.add(new ErrorModel('Must not be null', field.getCaption(), field.getName()));
                }
            }
            else {
                for (const c of this.constraints) {
                    const result = c.test(value);
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
    mustBeOnOrAbove(lowerValue: DateOnly, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    }
    mustBeAbove(lowerValue: DateOnly, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    }
    mustBeOnOrBelow(upperValue: DateOnly, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    }
    mustBeBelow(upperValue: DateOnly, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    }
}

export class DateTimeConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: DateTimeOffset, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    }
    mustBeAbove(lowerValue: DateTimeOffset, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    }
    mustBeOnOrBelow(upperValue: DateTimeOffset, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    }
    mustBeBelow(upperValue: DateTimeOffset, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, false, failureMessage));
    }
}

export class TimeConstraintCollection extends ConstraintCollection {
    mustBeOnOrAbove(lowerValue: TimeOnly, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, true, failureMessage));
    }
    mustBeAbove(lowerValue: TimeOnly, failureMessage: string) {
        this.add(new LowerRangeConstraint(lowerValue, false, failureMessage));
    }
    mustBeOnOrBelow(upperValue: TimeOnly, failureMessage: string) {
        this.add(new UpperRangeConstraint(upperValue, true, failureMessage));
    }
    mustBeBelow(upperValue: TimeOnly, failureMessage: string) {
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
        const comparable = value as any;
        if (comparable.compareTo) {
            const compareResult = comparable.compareTo(this.boundValue);
            if (compareResult > 0) {
                return true;
            }
            else if (compareResult === 0) {
                return this.isIncluded;
            }
            return false;
        }
        else if (value > this.boundValue) {
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
        const comparable = value as any;
        if (comparable.compareTo) {
            const compareResult = comparable.compareTo(this.boundValue);
            if (compareResult < 0) {
                return true;
            }
            else if (compareResult === 0) {
                return this.isIncluded;
            }
            return false;
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