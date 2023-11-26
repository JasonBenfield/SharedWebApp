import { Month } from "./Month";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";

export class DateOnly {
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
                    Month.fromValue(Number(match.groups.Month || '0')),
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
            new DateOnly(date.getFullYear(), Month.fromIndex(date.getMonth()), date.getDate()) :
            null;
    }

    static firstOfMonth(year: number, month: Month) {
        return new DateOnly(year, month, 1);
    }

    static monthEnd(year: number, month: Month) {
        return new DateOnly(year, month.add(1), 0);
    }

    static max() { return new DateOnly(9999, Month.December, 31); }

    private readonly _year: number;
    private readonly _month: Month;
    private readonly _date: number;
    private readonly _refDate: Date;

    constructor(year: number, month: Month, date: number) {
        this._refDate = new Date(year, month.index, date);
        this._year = this._refDate.getFullYear();
        this._month = Month.fromIndex(this._refDate.getMonth());
        this._date = this._refDate.getDate();
    }

    get year() { return this._year; }
    get month() { return this._month; }
    get date() { return this._date; }
    get day() { return this._refDate.getDay(); }

    get isMaxYear() { return this.year >= 9999; }

    toDate(timeOnly?: TimeOnly) {
        return new Date(
            this._year,
            this._month.index,
            this._date,
            timeOnly ? timeOnly.hours : 0,
            timeOnly ? timeOnly.minutes : 0,
            timeOnly ? timeOnly.seconds : 0,
            timeOnly ? timeOnly.milliseconds : 0
        );
    }
    
    addYears(years: number) {
        return new DateOnly(this._year + years, this.month, this.date);
    }

    addMonths(months: number) {
        return new DateOnly(this._year, Month.fromIndex(this.month.index + months), this.date);
    }

    addDays(days: number) {
        return new DateOnly(this._year, this._month, this._date + days);
    }

    addTimeSpan(timeSpan: TimeSpan) {
        const date = this.toDate();
        date.setDate(date.getDate() + timeSpan.days);
        date.setHours(date.getHours() + timeSpan.hours);
        date.setMinutes(date.getMinutes() + timeSpan.minutes);
        date.setSeconds(date.getSeconds() + timeSpan.seconds);
        date.setMilliseconds(date.getMilliseconds() + timeSpan.milliseconds);
        return date;
    }

    subTimeSpan(timeSpan: TimeSpan) {
        const date = this.toDate();
        date.setDate(date.getDate() - timeSpan.days);
        date.setHours(date.getHours() - timeSpan.hours);
        date.setMinutes(date.getMinutes() - timeSpan.minutes);
        date.setSeconds(date.getSeconds() - timeSpan.seconds);
        date.setMilliseconds(date.getMilliseconds() - timeSpan.milliseconds);
        return date;
    }
    
    toISOString() {
        const monthText = this._month.value.toString().padStart(2, '0');
        const dateText = this._date.toString().padStart(2, '0');
        return `${this._year}-${monthText}-${dateText}`;
    }

    toLocaleString() {
        return this._refDate.toLocaleDateString();
    }

    toJSON() {
        return this.toISOString();
    }

    format(options?: Intl.DateTimeFormatOptions) {
        const dateOptions: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: '2-digit' };
        if (options) {
            dateOptions.day = options.day;
            dateOptions.weekday = options.weekday;
            dateOptions.year = options.year;
            dateOptions.month = options.month;
        }
        return this.toDate().toLocaleDateString([], dateOptions);
    }

    toString() { return this.format(); }

    equals(other?: DateOnly) {
        if (other) {
            if (this === other) {
                return true;
            }
            return this._year === other._year &&
                this._month.equals(other._month) &&
                this._date === other._date;
        }
        return false;
    }

    compareTo(other?: DateOnly) {
        if (other) {
            if (this._year < other._year) {
                return -1;
            }
            else if (this._year > other._year) {
                return 1;
            }
            else {
                const monthResult = this._month.compareTo(other._month);
                if (monthResult === 0) {
                    if (this._date < other._date) {
                        return -1;
                    }
                    else if (this._date > other._date) {
                        return 1;
                    }
                    return 0;
                }
                return monthResult;
            }
        }
        return -1;
    }
}