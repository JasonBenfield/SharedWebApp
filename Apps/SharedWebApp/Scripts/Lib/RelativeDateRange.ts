import { DateOnly } from "./DateOnly";
import { DateRange } from "./DateRange";
import { FormattedDate } from "./FormattedDate";
import { ValueRangeBound } from "./ValueRangeBound";

interface ISerializableRelativeYearOffset {
    readonly type: string;
    readonly value: {
        readonly yearOffset: number;
        readonly month: MonthOfYear;
        readonly dayOfMonth: ISerializableDayOfMonth;
    }
}

export type MonthOfYear = number | 'reference-date';

function formatOrdinalDay(day: number) {
    let suffix = 'th';
    if (day === 1 || day === 21) {
        suffix = 'st';
    }
    else if (day === 2 || day === 22) {
        suffix = 'nd';
    }
    else if (day === 3 || day === 23) {
        suffix = 'rd';
    }
    return `${day}${suffix}`;
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

    constructor(readonly yearOffset: number, readonly month: MonthOfYear, dayOfMonth: DayOfMonth | DayOfMonthValue) {
        if (dayOfMonth instanceof DayOfMonth) {
            this.dayOfMonth = dayOfMonth;
        }
        else {
            this.dayOfMonth = new DayOfMonth(dayOfMonth);
        }
    }

    format() {
        const yearOffset = Math.abs(this.yearOffset);
        let type = this.yearOffset < 0 ? ' ago' : ' later';
        if (yearOffset === 0) {
            type = '';
        }
        const yearOffsetText = yearOffset > 0 ? yearOffset.toString() : 'same';
        const pluralized = yearOffset > 1 ? 's' : '';
        const month = typeof this.month === 'number'
            ? new FormattedDate(new Date(2022, this.month, 1), { month: 'long' }).formatDate()
            : 'reference month';
        const dayOfMonth = typeof this.dayOfMonth.value === 'number'
            ? `on the ${formatOrdinalDay(this.dayOfMonth.value)}`
            : this.dayOfMonth.format().toLowerCase();
        return `${yearOffsetText} year${pluralized}${type} in ${month} ${dayOfMonth}`;
    }

    toDate(referenceDate: DateOnly) {
        return this.dayOfMonth.toDate(
            new DateOnly(
                referenceDate.year + this.yearOffset,
                typeof this.month === 'number' ? this.month : referenceDate.month,
                1
            ),
            referenceDate.date
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

    format() {
        const monthOffset = Math.abs(this.monthOffset);
        const monthOffsetText = monthOffset > 0 ? monthOffset.toString() : 'same';
        let type = this.monthOffset < 0 ? ' ago' : ' later';
        if (monthOffset === 0) {
            type = '';
        }
        const pluralized = monthOffset > 1 ? 's' : '';
        const dayOfMonth = typeof this.dayOfMonth.value === 'number'
            ? `on the ${formatOrdinalDay(this.dayOfMonth.value)}`
            : this.dayOfMonth.format().toLowerCase();
        return `${monthOffsetText} month${pluralized}${type} ${dayOfMonth}`;
    }

    toDate(referenceDate: DateOnly) {
        return this.dayOfMonth.toDate(
            new DateOnly(
                referenceDate.year,
                referenceDate.month + this.monthOffset,
                1
            ),
            referenceDate.date
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

export class DaysOfMonth {
    private readonly daysOfMonth: DayOfMonth[] = [];

    constructor() {
        this.daysOfMonth.push(new DayOfMonth('reference-day'));
        for (let day = 1; day <= 30; day++) {
            this.daysOfMonth.push(new DayOfMonth(day));
        }
        this.daysOfMonth.push(new DayOfMonth('month-end'));
    }

    get values() { return this.daysOfMonth; }

    value(dayOfMonth: DayOfMonth) {
        let result: DayOfMonth;
        if (dayOfMonth) {
            if (dayOfMonth.isReferenceDay) {
                result = this.daysOfMonth[0];
            }
            else if (dayOfMonth.isMonthEnd) {
                result = this.daysOfMonth[31];
            }
            else {
                result = this.daysOfMonth[dayOfMonth.value];
            }
        }
        return result;
    }
}

export class DayOfMonth {
    static deserialize(serialized: ISerializableDayOfMonth) {
        return new DayOfMonth(serialized.value);
    }

    constructor(readonly value: DayOfMonthValue) {
    }

    get isMonthEnd() { return this.value === 'month-end'; }

    get isReferenceDay() { return this.value === 'reference-day'; }

    format() {
        let formatted: string;
        if (this.value === 'month-end') {
            formatted = 'End of Month';
        }
        else if (this.value === 'reference-day') {
            formatted = 'Reference Day';
        }
        else {
            formatted = this.value.toString();
        }
        return formatted;
    }

    toDate(startOfMonth: DateOnly, referenceDay: number) {
        const result = new DateOnly(
            startOfMonth.year,
            startOfMonth.month,
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
        const monthEnd = new DateOnly(
            result.year,
            result.month + 1,
            0
        );
        if (dayOfMonth > monthEnd.date) {
            dayOfMonth = monthEnd.date;
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

    format() {
        const dayOffset = Math.abs(this.dayOffset);
        let type = this.dayOffset < 0 ? ' ago' : ' later';
        if (dayOffset === 0) {
            type = '';
        }
        const dayOffsetText = dayOffset > 0 ? dayOffset.toString() : 'same';
        const pluralized = dayOffset > 1 ? 's' : '';
        return `${dayOffsetText} day${pluralized}${type}`;
    }

    toDate(referenceDate: DateOnly) {
        const result = referenceDate.copy();
        result.setDate(result.date + this.dayOffset);
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
        readonly relativeStart: RelativeOffset,
        readonly relativeEnd: RelativeOffset,
        readonly isEndRelativeToStart: boolean = true
    ) {
    }

    format() {
        if (this.relativeStart && this.relativeEnd) {
            return `From ${this.relativeStart.format()} until ${this.relativeEnd.format()}`;
        }
        if (this.relativeStart) {
            return `On or after ${this.relativeStart.format()}`;
        }
        if (this.relativeEnd) {
            return `On or before ${this.relativeEnd.format()}`;
        }
        return '';
    }

    toDateRange(referenceDate: DateOnly = DateOnly.today()) {
        const start = this.relativeStart ?
            new ValueRangeBound(this.relativeStart.toDate(referenceDate), true) :
            null;
        const endReferenceDate = this.isEndRelativeToStart && start ?
            start.value :
            referenceDate;
        const endDate = this.relativeEnd ?
            this.relativeEnd.toDate(endReferenceDate) :
            null;
        if (endDate) {
            endDate.setDate(endDate.date + 1);
        }
        const end = endDate ?
            new ValueRangeBound(endDate, false) :
            null;
        return new DateRange(start, end);
    }

    serialize() {
        return {
            relativeStart: this.relativeStart ? this.relativeStart.serialize() : null,
            relativeEnd: this.relativeEnd ? this.relativeEnd.serialize() : null,
            isEndRelativeToStart: this.isEndRelativeToStart
        } as ISerializableRelativeDateRange;
    }
}