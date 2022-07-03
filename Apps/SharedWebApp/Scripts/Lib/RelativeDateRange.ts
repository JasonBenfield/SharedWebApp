import { DateRange } from "./DateRange";

interface ISerializableRelativeYearOffset {
    readonly type: string;
    readonly value: {
        readonly yearOffset: number;
        readonly month: number;
        readonly dayOfMonth: ISerializableDayOfMonth;
    }
}

export class RelativeYearOffset {
    static deserialize(serialized: ISerializableRelativeYearOffset) {
        return new RelativeYearOffset(
            serialized.value.yearOffset,
            serialized.value.month,
            DayOfMonth.deserialize(serialized.value.dayOfMonth)
        );
    }

    readonly dayOfMonth: DayOfMonth;

    constructor(readonly yearOffset: number, readonly month: number, dayOfMonth: DayOfMonth | DayOfMonthValue) {
        if (dayOfMonth instanceof DayOfMonth) {
            this.dayOfMonth = dayOfMonth;
        }
        else {
            this.dayOfMonth = new DayOfMonth(dayOfMonth);
        }
    }

    toDate(referenceDate: Date) {
        return this.dayOfMonth.toDate(
            new Date(
                referenceDate.getFullYear() + this.yearOffset,
                this.month,
                1
            ),
            referenceDate.getDate()
        );
    }

    serialize() {
        return {
            type: RelativeYearOffset.name,
            value: {
                yearOffset: this.yearOffset,
                month: this.month,
                dayOfMonth: this.dayOfMonth.serialize()
            }
        } as ISerializableRelativeYearOffset;
    }
}

interface ISerializableRelativeMonthOffset {
    readonly type: string;
    readonly value: {
        readonly monthOffset: number;
        readonly dayOfMonth: ISerializableDayOfMonth
    }
}

export class RelativeMonthOffset {
    readonly dayOfMonth: DayOfMonth;

    static deserialize(serialized: ISerializableRelativeMonthOffset) {
        return new RelativeMonthOffset(
            serialized.value.monthOffset,
            DayOfMonth.deserialize(serialized.value.dayOfMonth)
        );
    }

    constructor(readonly monthOffset: number, dayOfMonth: DayOfMonth | DayOfMonthValue) {
        if (dayOfMonth instanceof DayOfMonth) {
            this.dayOfMonth = dayOfMonth;
        }
        else {
            this.dayOfMonth = new DayOfMonth(dayOfMonth);
        }
    }

    toDate(referenceDate: Date) {
        return this.dayOfMonth.toDate(
            new Date(
                referenceDate.getFullYear(),
                referenceDate.getMonth() + this.monthOffset,
                1
            ),
            referenceDate.getDate()
        );
    }

    serialize() {
        return {
            type: RelativeMonthOffset.name,
            value: {
                monthOffset: this.monthOffset,
                dayOfMonth: this.dayOfMonth.serialize()
            }
        } as ISerializableRelativeMonthOffset;
    }
}

type DayOfMonthValue = number | 'month-end' | 'reference-day';

interface ISerializableDayOfMonth {
    readonly type: string;
    readonly value: DayOfMonthValue;
}

export class DayOfMonth {
    static deserialize(serialized: ISerializableDayOfMonth) {
        return new DayOfMonth(serialized.value);
    }

    constructor(private readonly value: DayOfMonthValue) {
    }

    toDate(startOfMonth: Date, referenceDay: number) {
        const result = new Date(
            startOfMonth.getFullYear(),
            startOfMonth.getMonth(),
            1
        );
        let dayOfMonth: number;
        if (this.value === 'month-end') {
            dayOfMonth = 31;
        }
        else if (this.value === 'reference-day') {
            dayOfMonth = referenceDay;
        }
        else {
            dayOfMonth = this.value;
        }
        const monthEnd = new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        );
        if (dayOfMonth > monthEnd.getDate()) {
            dayOfMonth = monthEnd.getDate();
        }
        result.setDate(dayOfMonth);
        return result;
    }

    serialize() {
        return {
            type: DayOfMonth.name,
            value: this.value
        } as ISerializableDayOfMonth;
    }
}

interface ISerializableRelativeDayOffset {
    readonly type: string;
    readonly value: number;
}

export class RelativeDayOffset {
    static deserialize(serialized: ISerializableRelativeDayOffset) {
        return new RelativeDayOffset(serialized.value);
    }

    constructor(readonly dayOffset: number) {
    }

    toDate(referenceDate: Date) {
        const result = new Date(
            referenceDate.getFullYear(),
            referenceDate.getMonth(),
            referenceDate.getDate() + this.dayOffset
        );
        return result;
    }

    serialize() {
        return {
            type: RelativeDayOffset.name,
            value: this.dayOffset
        } as ISerializableRelativeDayOffset;
    }
}

export type RelativeOffset = RelativeDayOffset | RelativeMonthOffset | RelativeYearOffset;

type SerializableRelativeOffset = ISerializableRelativeDayOffset | ISerializableRelativeMonthOffset | ISerializableRelativeYearOffset;

export interface ISerializableRelativeDateRange {
    readonly relativeStart: SerializableRelativeOffset;
    readonly relativeEnd: SerializableRelativeOffset;
    readonly isEndRelativeToStart: boolean
}

export class RelativeDateRange {
    static deserialize(serialized: ISerializableRelativeDateRange) {
        if (serialized) {
            return new RelativeDateRange(
                RelativeDateRange.deserializeRelativeOffset(serialized.relativeStart),
                RelativeDateRange.deserializeRelativeOffset(serialized.relativeEnd),
                serialized.isEndRelativeToStart
            );
        }
        return null;
    }

    private static deserializeRelativeOffset(serialized: SerializableRelativeOffset) {
        if (serialized) {
            if (serialized.type === RelativeYearOffset.name) {
                return RelativeYearOffset.deserialize(serialized as ISerializableRelativeYearOffset);
            }
            else if (serialized.type === RelativeMonthOffset.name) {
                return RelativeMonthOffset.deserialize(serialized as ISerializableRelativeMonthOffset);
            }
            else if (serialized.type === RelativeDayOffset.name) {
                return RelativeDayOffset.deserialize(serialized as ISerializableRelativeDayOffset);
            }
        }
        return null;
    }

    constructor(
        private readonly relativeStart: RelativeOffset,
        private readonly relativeEnd: RelativeOffset,
        private readonly isEndRelativeToStart: boolean = true
    ) {
    }

    toDateRange(referenceDate: Date = new Date()) {
        const startDate = this.relativeStart ? this.relativeStart.toDate(referenceDate) : null;
        const endReferenceDate = this.isEndRelativeToStart && startDate ? startDate : referenceDate;
        const endDate = this.relativeEnd ? this.relativeEnd.toDate(endReferenceDate) : null;
        return new DateRange(startDate, endDate);
    }

    serialize() {
        return {
            relativeStart: this.relativeStart ? this.relativeStart.serialize() : null,
            relativeEnd: this.relativeEnd ? this.relativeEnd.serialize() : null,
            isEndRelativeToStart: this.isEndRelativeToStart
        } as ISerializableRelativeDateRange;
    }
}