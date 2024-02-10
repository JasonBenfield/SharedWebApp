import { DateTimeFormatOptions } from "./DateTimeFormatOptions";
import { Month } from "./Month";
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
        return TimeOnly.fromDateTime(new Date())!;
    }

    static fromDateTime(date: Date) {
        return date ?
            new TimeOnly(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()) :
            null;
    }

    private readonly _hours: number;
    private readonly _minutes: number;
    private readonly _seconds: number;
    private readonly _milliseconds: number;

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
        const refDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes,
            seconds,
            milliseconds
        );
        this._hours = refDate.getHours();
        this._minutes = refDate.getMinutes();
        this._seconds = refDate.getSeconds();
        this._milliseconds = refDate.getMilliseconds();
    }

    get hours() { return this._hours; }

    get minutes() { return this._minutes; }

    get seconds() { return this._seconds; }

    get milliseconds() { return this._milliseconds; }

    toDate(): Date;
    toDate(year: number, month: Month, date: number): Date;
    toDate(year?: number, month?: Month, date?: number) {
        const now = new Date();
        return new Date(
            year ? year : now.getFullYear(),
            month ? month.index : now.getMonth(),
            date ? date : now.getDate(),
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addHours(hours: number) {
        return new TimeOnly(
            this.hours + hours,
            this.minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addMinutes(minutes: number) {
        return new TimeOnly(
            this.hours,
            this.minutes + minutes,
            this.seconds,
            this.milliseconds
        );
    }

    addSeconds(seconds: number) {
        return new TimeOnly(
            this.hours,
            this.minutes,
            this.seconds + seconds,
            this.milliseconds
        );
    }

    addMilliseconds(milliseconds: number) {
        return new TimeOnly(
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds + milliseconds
        );
    }

    addTimeSpan(timeSpan: TimeSpan) {
        return new TimeOnly(
            this.hours + timeSpan.hours,
            this.minutes + timeSpan.minutes,
            this.seconds + timeSpan.seconds,
            this.milliseconds + timeSpan.milliseconds
        );
    }

    subTimeSpan(timeSpan: TimeSpan) {
        return new TimeOnly(
            this.hours - timeSpan.hours,
            this.minutes - timeSpan.minutes,
            this.seconds - timeSpan.seconds,
            this.milliseconds - timeSpan.milliseconds
        );
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
        return this.toDate().toLocaleTimeString();
    }

    toJSON() {
        return this.toISOString();
    }

    format(options?: DateTimeFormatOptions | Intl.DateTimeFormatOptions) {
        const timeOptions = options instanceof DateTimeFormatOptions ?
            options :
            new DateTimeFormatOptions(options);
        return this.toDate().toLocaleTimeString([], timeOptions.getTimeOptions());
    }

    equals(other: TimeOnly | null | undefined) {
        if (other) {
            if (this === other) {
                return true;
            }
            return this.hours === other.hours && this.minutes === other.minutes &&
                this.seconds === other.seconds && this.milliseconds === other.milliseconds;
        }
        return false;
    }

    compareTo(other: TimeOnly | null | undefined) {
        let result: number;
        if (other) {
            if (this === other) {
                result = 0;
            }
            else if (this.hours > other.hours) {
                result = 1;
            }
            else if (this.hours < other.hours) {
                result = -1;
            }
            else if (this.hours === other.hours) {
                if (this.minutes > other.minutes) {
                    result = 1;
                }
                else if (this.minutes < other.minutes) {
                    result = -1;
                }
                else if (this.minutes === other.minutes) {
                    if (this.seconds > other.seconds) {
                        result = 1;
                    }
                    else if (this.seconds < other.seconds) {
                        result = -1;
                    }
                    else if (this.seconds === other.seconds) {
                        if (this.milliseconds > other.milliseconds) {
                            result = 1;
                        }
                        else if (this.milliseconds < other.milliseconds) {
                            result = -1;
                        }
                        else {
                            result = 0;
                        }
                    }
                }
            }
        }
        else {
            result = -1;
        }
        return result;
    }

    toString() {
        return this.format();
    }
}