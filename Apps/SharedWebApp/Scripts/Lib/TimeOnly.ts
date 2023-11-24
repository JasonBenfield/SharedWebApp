import { FormattedTimeOnly } from "./FormattedTimeOnly";
import { TimeSpan } from "./TimeSpan";

export class TimeOnly {

    private static readonly regex1 = /^(?<hours>\d{1,2}):(?<minutes>\d{1,2}):?(?<seconds>\d{1,2})?(\.(?<ticks>\d+))?$/;

    static canParse(text: string) { return TimeOnly.regex1.test(text); }

    static parse(text: string) {
        if (TimeOnly.regex1.test(text)) {
            const match = TimeOnly.regex1.exec(text);
            return new TimeOnly(
                Number(match.groups.hours || '0'),
                Number(match.groups.minutes || '0'),
                Number(match.groups.seconds || '0'),
                Number(match.groups.ticks || '0')
            );
        }
        return null;
    }

    static now() {
        return TimeOnly.fromDateTime(new Date());
    }

    static fromDateTime(date: Date) {
        return date ?
            new TimeOnly(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()) :
            null;
    }

    private readonly _date: Date;
    
    constructor(hours: number, minutes: number, seconds?: number, milliseconds?: number) {
        const date = new Date();
        if (!seconds) {
            seconds = 0;
        }
        if (!milliseconds) {
            milliseconds = 0;
        }
        if (milliseconds > 999) {
            milliseconds = Math.floor(Number(milliseconds.toString().padEnd(7, '0')) / 10000.0);
        }
        this._date = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes,
            seconds,
            milliseconds
        );
    }

    get hours() { return this._date.getHours(); }

    get minutes() { return this._date.getMinutes(); }

    get seconds() { return this._date.getSeconds(); }

    get milliseconds() { return this._date.getMilliseconds(); }

    copy() {
        return new TimeOnly(this.hours, this.minutes, this.seconds, this.milliseconds);
    }

    add(timeSpan: TimeSpan) {
        const timeOnly = this.copy();
        timeOnly.setHours(timeOnly.hours + timeSpan.hours);
        timeOnly.setMinutes(timeOnly.minutes + timeSpan.minutes);
        timeOnly.setSeconds(timeOnly.seconds + timeSpan.seconds);
        timeOnly.setMilliseconds(timeOnly.milliseconds + timeSpan.milliseconds);
        return timeOnly;
    }

    sub(timeSpan: TimeSpan) {
        const timeOnly = this.copy();
        timeOnly.setHours(timeOnly.hours - timeSpan.hours);
        timeOnly.setMinutes(timeOnly.minutes - timeSpan.minutes);
        timeOnly.setSeconds(timeOnly.seconds - timeSpan.seconds);
        timeOnly.setMilliseconds(timeOnly.milliseconds - timeSpan.milliseconds);
        return timeOnly;
    }
    
    setHours(hours: number) {
        return this._date.setHours(hours);
    }

    setMinutes(minutes: number) {
        return this._date.setMinutes(minutes);
    }

    setSeconds(seconds: number) {
        return this._date.setSeconds(seconds);
    }

    setMilliseconds(milliseconds: number) {
        return this._date.setMilliseconds(milliseconds);
    }

    toISOString() {
        const hoursText = this.hours.toString().padStart(2, '0');
        const minutesText = this.minutes.toString().padStart(2, '0');
        const secondsText = this.seconds.toString().padStart(2, '0');
        const millisecondsText = this.milliseconds.toString().padStart(3, '0');
        const ticksText = ''.padStart(4, '0');
        return `${hoursText}:${minutesText}:${secondsText}.${millisecondsText}${ticksText}`;
    }

    toLocaleString() {
        return this._date.toLocaleTimeString();
    }

    toJSON() {
        return this.toISOString();
    }

    format(options?: Intl.DateTimeFormatOptions) {
        return new FormattedTimeOnly(this._date, options).formatTime();
    }

    equals(other: TimeOnly) {
        if (other) {
            return this.hours === other.hours && this.minutes === other.minutes &&
                this.seconds === other.seconds && this.milliseconds === other.milliseconds;
        }
        return false;
    }

    toString() {
        return this.format();
    }
}