import { FormattedDateOnly } from "./FormattedDateOnly";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";

export class DateOnly {
    private readonly _date: Date;

    private static readonly dateOnlyRegex = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Date>\d{2})$/;

    static canParse(text: string) {
        return DateOnly.dateOnlyRegex.test(text);
    }

    static parse(text: string) {
        let result: DateOnly;
        if (text) {
            if (DateOnly.dateOnlyRegex.test(text)) {
                const match = DateOnly.dateOnlyRegex.exec(text);
                result = new DateOnly(
                    Number(match.groups.Year || '0'),
                    Number(match.groups.Month || '0') - 1,
                    Number(match.groups.Date || '0')
                );
            }
            else {
                result = null;
            }
        }
        else {
            result = null;
        }
        return result;
    }

    static today() { return DateOnly.fromDate(new Date()); }

    static fromDate(date: Date) {
        return date ?
            new DateOnly(date.getFullYear(), date.getMonth(), date.getDate()) :
            null;
    }

    constructor(year: number, month: number, date: number) {
        this._date = new Date(year, month, date);
    }

    get year() { return this._date.getFullYear(); }
    get month() { return this._date.getMonth(); }
    get date() { return this._date.getDate(); }
    get day() { return this._date.getDay(); }

    get isMaxYear() { return this.year >= 9999; }

    setYear(year: number) {
        this._date.setFullYear(year);
    }

    setMonth(month: number) {
        this._date.setMonth(month);
    }

    setDate(date: number) {
        this._date.setDate(date);
    }

    toDate() {
        return this.fromDate(this._date);
    }

    toDateTime(timeOnly: TimeOnly) {
        const date = this.fromDate(this._date);
        date.setHours(timeOnly.hours);
        date.setMinutes(timeOnly.minutes);
        date.setSeconds(timeOnly.seconds);
        date.setMilliseconds(timeOnly.milliseconds);
        return date;
    }

    copy() {
        return DateOnly.fromDate(this._date);
    }

    add(timeSpan: TimeSpan) {
        const date = this.toDate();
        date.setDate(date.getDate() + timeSpan.days);
        date.setHours(date.getHours() + timeSpan.hours);
        date.setMinutes(date.getMinutes() + timeSpan.minutes);
        date.setSeconds(date.getSeconds() + timeSpan.seconds);
        date.setMilliseconds(date.getMilliseconds() + timeSpan.milliseconds);
        return date;
    }

    sub(timeSpan: TimeSpan) {
        const date = this.toDate();
        date.setDate(date.getDate() - timeSpan.days);
        date.setHours(date.getHours() - timeSpan.hours);
        date.setMinutes(date.getMinutes() - timeSpan.minutes);
        date.setSeconds(date.getSeconds() - timeSpan.seconds);
        date.setMilliseconds(date.getMilliseconds() - timeSpan.milliseconds);
        return date;
    }

    private fromDate(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }

    toISOString() {
        const monthText = (this._date.getMonth() + 1).toString().padStart(2, '0');
        const dateText = this._date.getDate().toString().padStart(2, '0');
        return `${this._date.getFullYear()}-${monthText}-${dateText}`;
    }

    toLocaleString() {
        return this._date.toLocaleDateString();
    }

    toJSON() {
        return this.toISOString();
    }

    format(options?: Intl.DateTimeFormatOptions) {
        return new FormattedDateOnly(this._date, options).formatDate();
    }

    toString() { return this.format(); }

    equals(other?: DateOnly) {
        if (other) {
            return this._date.getFullYear() === other._date.getFullYear() &&
                this._date.getMonth() === other._date.getMonth() &&
                this._date.getDate() === other._date.getDate();
        }
        return false;
    }
}