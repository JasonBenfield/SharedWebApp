import { DateOnly } from "./DateOnly";
import { Month } from "./Month";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";

export class DateTimeOffset {
    private static readonly regex = /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}(\.\d{0,7})?(\s*([\+\-]\d{2}:\d{2})|Z)?$/;

    static canParse(text: string) {
        return text ? DateTimeOffset.regex.test(text) : false;
    }

    static parse(text: string) {
        return DateTimeOffset.canParse(text) ? DateTimeOffset.fromDate(new Date(Date.parse(text))) : null;
    }

    static now() { return DateTimeOffset.fromDate(new Date()); }

    static fromDate(date: Date) {
        if (date) {
            const month = Month.fromIndex(date.getMonth());
            return new DateTimeOffset(
                date.getFullYear(),
                month,
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            );
        }
        return null;
    }


    static UTC(year: number, month: Month, date: number): DateTimeOffset;
    static UTC(year: number, month: Month, date: number, hour: number, minute: number): DateTimeOffset;
    static UTC(year: number, month: Month, date: number, hour: number, minute: number, second: number): DateTimeOffset;
    static UTC(year: number, month: Month, date: number, hour: number, minute: number, second: number, millisecond: number): DateTimeOffset;
    static UTC(year: number, month: Month, date: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTimeOffset {
        const utc = Date.UTC(year, month.index, date, hour || 0, minute || 0, second || 0, millisecond || 0);
        const utcDate = new Date(utc);
        return DateTimeOffset.fromDate(utcDate);
    }




    static create(date: DateOnly, time: TimeOnly) {
        return new DateTimeOffset(
            date.year,
            date.month,
            date.date,
            time.hours,
            time.minutes,
            time.seconds,
            time.milliseconds
        );
    }

    private readonly refDate: Date;
    private readonly _year: number;
    private readonly _month: Month;
    private readonly _date: number;
    private readonly _hours: number;
    private readonly _minutes: number;
    private readonly _seconds: number;
    private readonly _milliseconds: number;
    private readonly _timeZoneOffset: number;

    constructor(year: number, month: Month, date: number);
    constructor(year: number, month: Month, date: number, hour: number, minute: number);
    constructor(year: number, month: Month, date: number, hour: number, minute: number, second: number);
    constructor(year: number, month: Month, date: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: Month, date: number, hour?: number, minute?: number, second?: number, millisecond?: number) {
        this.refDate = new Date(year, month.index, date, hour || 0, minute || 0, second || 0, millisecond || 0);
        this._year = this.refDate.getFullYear();
        this._month = Month.fromIndex(this.refDate.getMonth());
        this._date = this.refDate.getDate();
        this._hours = this.refDate.getHours();
        this._minutes = this.refDate.getMinutes();
        this._seconds = this.refDate.getSeconds();
        this._milliseconds = this.refDate.getMilliseconds();
        this._timeZoneOffset = this.refDate.getTimezoneOffset();
    }

    get year() { return this._year; }

    get month() { return this._month; }

    get date() { return this._date; }

    get hours() { return this._hours; }

    get minutes() { return this._minutes; }

    get seconds() { return this._seconds; }

    get milliseconds() { return this._milliseconds; }

    get timeZoneOffset() { return this._timeZoneOffset; }

    get isMaxYear() { return this._year >= 9999; }

    toDate() {
        return new Date(this.refDate.getTime());
    }

    toDateOnly() {
        return new DateOnly(this.year, this.month, this.date);
    }

    toTimeOnly() {
        return new TimeOnly(this.hours, this.minutes, this.seconds, this.milliseconds);
    }

    addYears(years: number) {
        return new DateTimeOffset(
            this._year + years,
            this.month,
            this.date,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addMonths(months: number) {
        return new DateTimeOffset(
            this._year,
            Month.fromIndex(this.month.index + months),
            this.date,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addDays(days: number) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date + days,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addHours(hours: number) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date,
            this.hours + hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addMinutes(minutes: number) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date,
            this.hours,
            this.minutes + minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addSeconds(seconds: number) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date,
            this.hours,
            this.minutes,
            this.seconds + seconds,
            this.milliseconds
        );
    }

    addMilliseconds(milliseconds: number) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds + milliseconds
        );
    }

    addTimeSpan(timeSpan: TimeSpan) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date + timeSpan.days,
            this.hours + timeSpan.hours,
            this.minutes + timeSpan.minutes,
            this.seconds + timeSpan.seconds,
            this.milliseconds + timeSpan.milliseconds
        );
    }

    subTimeSpan(timeSpan: TimeSpan) {
        return new DateTimeOffset(
            this._year,
            this._month,
            this._date - timeSpan.days,
            this.hours - timeSpan.hours,
            this.minutes - timeSpan.minutes,
            this.seconds - timeSpan.seconds,
            this.milliseconds - timeSpan.milliseconds
        );
    }

    minus(other: DateTimeOffset) {
        return TimeSpan.fromMilliseconds(this.refDate.getTime() - other.refDate.getTime());
    }

    toJSON() { return this.toISOString(); }

    toISOString() { return this.refDate.toISOString(); }

    toLocaleString() { return this.refDate.toLocaleString(); }

    toLocaleDateString() { return this.refDate.toLocaleDateString(); }

    toLocaleTimeString() { return this.refDate.toLocaleTimeString(); }

    format(options?: Intl.DateTimeFormatOptions) {
        if (options) {
            return this.refDate.toLocaleString([], options);
        }
        const formattedDate = this.formatDate(options);
        if (this.hours || this.minutes || this.seconds || this.milliseconds) {
            const formattedTime = this.formatTime(options);
            return `${formattedDate} ${formattedTime}`;
        }
        return formattedDate;
    }

    formatDate(options?: Intl.DateTimeFormatOptions) {
        if (!options) {
            options = {
                month: 'numeric', day: 'numeric', year: '2-digit'
            }
        }
        return this.refDate.toLocaleDateString([], options);
    }

    formatTime(options?: Intl.DateTimeFormatOptions) {
        if (!options) {
            options = {
                hour: 'numeric', minute: '2-digit'
            }
        }
        return this.refDate.toLocaleTimeString([], options);
    }

    toString() { return this.toLocaleString(); }

    equals(other: DateTimeOffset | Date) {
        if (other) {
            let otherDate: Date;
            if (other instanceof DateTimeOffset) {
                otherDate = other.refDate;
            }
            else {
                otherDate = other;
            }
            return this.refDate.getTime() === otherDate.getTime();
        }
        return false;
    }

    compareTo(other: DateTimeOffset | Date) {
        if (other) {
            let otherDate: Date;
            if (other instanceof DateTimeOffset) {
                otherDate = other.refDate;
            }
            else {
                otherDate = other;
            }
            if (this.refDate < otherDate) {
                return -1;
            }
            if (this.refDate > otherDate) {
                return 1;
            }
            return 0;
        }
        return false;
    }
}