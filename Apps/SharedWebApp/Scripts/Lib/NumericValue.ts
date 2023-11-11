export class NumericValue implements INumericValue {
    constructor(
        public readonly Value: number,
        public readonly DisplayText: string
    ) {
    }

    equalsAny(...other: number[] | string[] | INumericValue[]) {
        for (const item of other) {
            if (this.equals(item)) {
                return true;
            }
        }
        return false;
    }

    equals(other: number | string | INumericValue) {
        if (other === undefined || other === null) {
            return false;
        }
        if (typeof other === "number") {
            return this.Value === other;
        }
        else if (typeof other === "string") {
            const normalized = this.normalizeDisplayText(this.DisplayText);
            const otherNormalized = this.normalizeDisplayText(other);
            return normalized === otherNormalized || this.Value.toString() === other;
        }
        return this.Value === other.Value;
    }

    private normalizeDisplayText(displayText: string) {
        return displayText.replace(/\s+/g, '').toLowerCase();
    }

    toString() {
        return `${this.constructor.name} ${this.Value} ${this.DisplayText}`;
    }
}