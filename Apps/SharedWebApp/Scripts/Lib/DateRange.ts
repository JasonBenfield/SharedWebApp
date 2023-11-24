import { DateOnly } from "./DateOnly";
import { ISerializableValueRangeBound, ValueRangeBound } from "./ValueRangeBound";

export interface ISerializableDateRange {
    readonly start: ISerializableValueRangeBound<DateOnly>;
    readonly end: ISerializableValueRangeBound<DateOnly>;
}

export class DateRange {
    static deserialize(serialized: ISerializableDateRange) {
        return serialized
            ? new DateRange(
                ValueRangeBound.deserialize<DateOnly>(serialized.start),
                ValueRangeBound.deserialize<DateOnly>(serialized.end)
            )
            : null;
    }

    constructor(readonly start: ValueRangeBound<DateOnly>, readonly end: ValueRangeBound<DateOnly>) {
        if (start && !start.value) {
            this.start = null;
        }
        if (end && !end.value) {
            this.end = null;
        }
    }

    serialize() {
        const serialized: ISerializableDateRange = {
            start: this.start && this.start.serialize(),
            end: this.end && this.end.serialize()
        };
        return serialized;
    }

    format() {
        let str = '';
        const adjustedStartDate = this.start ? this.start.value.copy() : null;
        if (adjustedStartDate && !this.start.isIncluded) {
            adjustedStartDate.setDate(adjustedStartDate.date + 1);
        }
        const adjustedEndDate = this.end ? this.end.value.copy() : null;
        if (adjustedEndDate && !this.end.isIncluded) {
            adjustedEndDate.setDate(adjustedEndDate.date - 1);
        }
        if (adjustedStartDate && adjustedEndDate && adjustedStartDate.equals(adjustedEndDate)) {
            const dateText = adjustedStartDate.format();
            str += `On ${dateText}`;
        }
        else {
            if (this.start && this.start.value) {
                let prefix: string;
                if (this.start.isIncluded) {
                    prefix = 'On or After';
                }
                else {
                    prefix = 'After';
                }
                const startDateText = this.start.value.format();
                str += `${prefix} ${startDateText}`;
            }
            if (this.end && this.end.value) {
                if (str) {
                    str += ' to ';
                }
                let prefix: string;
                if (this.end.isIncluded) {
                    prefix = 'On or Before';
                }
                else {
                    prefix = 'Before';
                }
                const endDateText = this.end.value.format();
                str += `${prefix} ${endDateText}`;
            }
        }
        return str;
    }

    toString() {
        return this.format();
    }
}