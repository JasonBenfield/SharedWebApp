import { FormattedNumber } from "./FormattedNumber";
import { ValueRangeBound } from "./ValueRangeBound";

export class NumberRange {
    constructor(
        readonly start: ValueRangeBound<number>,
        readonly end: ValueRangeBound<number>,
        private readonly numberFormat: string = '0'
    ) {
    }

    format() {
        let str = '';
        if (this.start && this.end && this.start.isIncluded && this.end.isIncluded && this.start.value === this.end.value) {
            const startText = new FormattedNumber(this.start.value, this.numberFormat).toString();
            str += `Equal to ${startText}`;
        }
        else {
            if (this.start) {
                let prefix: string;
                if (this.start.isIncluded) {
                    prefix += 'At Least';
                }
                else {
                    prefix = 'More than';
                }
                const startText = new FormattedNumber(this.start.value, this.numberFormat).toString();
                str += `${prefix} ${startText}`;
            }
            if (this.end) {
                if (str) {
                    str += ' and ';
                }
                let prefix: string;
                if (this.end.isIncluded) {
                    prefix += 'At Most';
                }
                else {
                    prefix = 'Less than';
                }
                const endText = new FormattedNumber(this.end.value, this.numberFormat).toString();
                str += `${prefix} ${endText}`;
            }
        }
        return str;
    }

    toString() {
        return this.format();
    }
}