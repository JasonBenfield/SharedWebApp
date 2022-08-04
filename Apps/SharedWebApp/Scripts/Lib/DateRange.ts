import { FormattedDate } from "./FormattedDate";
import { ISerializableValueRangeBound, ValueRangeBound } from "./ValueRangeBound";

export interface ISerializableDateRange {
    readonly start: ISerializableValueRangeBound<Date>;
    readonly end: ISerializableValueRangeBound<Date>;
}

export class DateRange {
    static deserialize(serialized: ISerializableDateRange) {
        return serialized
            ? new DateRange(
                ValueRangeBound.deserialize<Date>(serialized.start),
                ValueRangeBound.deserialize<Date>(serialized.end)
            )
            : null;
    }

    constructor(readonly start: ValueRangeBound<Date>, readonly end: ValueRangeBound<Date>) {
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
        const adjustedStartDate = this.start ? new Date(this.start.value.getTime()) : null;
        if (adjustedStartDate && !this.start.isIncluded) {
            adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
        }
        const adjustedEndDate = this.end ? new Date(this.end.value.getTime()) : null;
        if (adjustedEndDate && !this.end.isIncluded) {
            adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
        }
        if (adjustedStartDate && adjustedEndDate && adjustedStartDate.getTime() === adjustedEndDate.getTime()) {
            const dateText = new FormattedDate(adjustedStartDate).formatDate();
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
                const startDateText = new FormattedDate(this.start.value).formatDate();
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
                const endDateText = new FormattedDate(this.end.value).formatDate();
                str += `${prefix} ${endDateText}`;
            }
        }
        return str;
    }

    toString() {
        return this.format();
    }
}