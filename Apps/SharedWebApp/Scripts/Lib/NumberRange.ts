import { FormattedNumber } from "./FormattedNumber";
import { ISerializableValueRangeBound, ValueRangeBound } from "./ValueRangeBound";

export interface ISerializableNumberRange {
    readonly start: ISerializableValueRangeBound<number>;
    readonly end: ISerializableValueRangeBound<number>;
    readonly numberFormat: string;
}

export class NumberRange {
    static deserialize(serialized: ISerializableNumberRange) {
        return new NumberRange(
            ValueRangeBound.deserialize(serialized.start),
            ValueRangeBound.deserialize(serialized.end),
            serialized.numberFormat
        );
    }

    constructor(
        readonly start: ValueRangeBound<number>,
        readonly end: ValueRangeBound<number>,
        private readonly numberFormat: string = '0'
    ) {
    }

    serialize() {
        const serialized: ISerializableNumberRange = {
            start: this.start ? this.start.serialize() : null,
            end: this.end ? this.end.serialize() : null,
            numberFormat: this.numberFormat
        };
        return serialized;
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
                    prefix = 'At Least';
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
                    prefix = 'At Most';
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