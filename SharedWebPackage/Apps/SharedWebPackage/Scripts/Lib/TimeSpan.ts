
export class TimeSpan implements IFormattable {

    private static readonly regex1 = /^(?<days>\d+\.)?(?<hours>\d{1,2}):(?<minutes>\d{1,2}):?(?<seconds>\d{1,2})?(\.(?<ticks>\d+))?$/;
    private static readonly regex2 = /^PT(?<seconds>\d+)\.(?<ticks>\d{1,7})S$/;

    static canParse(text: string) { return TimeSpan.regex1.test(text) || TimeSpan.regex2.test(text); }

    static parse(text: string) {
        if (TimeSpan.regex1.test(text)) {
            const match = TimeSpan.regex1.exec(text);
            return new TimeSpan(
                Number(match.groups.days || '0'),
                Number(match.groups.hours || '0'),
                Number(match.groups.minutes || '0'),
                Number(match.groups.seconds || '0'),
                Number(match.groups.ticks || '0')
            );
        }
        else if (TimeSpan.regex2.test(text)) {
            const match = TimeSpan.regex2.exec(text);
            return new TimeSpan(
                Number(match.groups.days || '0'),
                Number(match.groups.hours || '0'),
                Number(match.groups.minutes || '0'),
                Number(match.groups.seconds || '0'),
                Number(match.groups.ticks || '0')
            );
        }
        return null;
    }

    static fromDays(value: number) {
        return TimeSpan.fromHours(value * 24);
    }

    static fromHours(value: number) {
        return TimeSpan.fromMinutes(value * 60);
    }

    static fromMinutes(value: number) {
        return TimeSpan.fromSeconds(value * 60);
    }

    static fromSeconds(value: number) {
        return TimeSpan.fromMilliseconds(value * 1000);
    }

    static fromMilliseconds(value: number) {
        return TimeSpan.fromTicks(value * 10000);
    }

    static fromTicks(value: number) {
        const ticks = value % 10000000;
        value = Math.floor(value / 10000000);
        const seconds = value % 60;
        value = Math.floor(value / 60);
        const minutes = value % 60;
        value = Math.floor(value / 60);
        const hours = value % 24;
        value = Math.floor(value / 24);
        const days = value;
        return new TimeSpan(days, hours, minutes, seconds, ticks);
    }

    readonly milliseconds: number;
    private readonly totalTicks;
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly ticks: number;

    constructor(days: number, hours: number, minutes?: number, seconds?: number, ticks?: number) {
        this.days = days || 0;
        this.hours = hours || 0;
        this.minutes = minutes || 0;
        this.seconds = seconds || 0;
        this.ticks = ticks || 0;
        if (this.ticks >= 10000000) {
            this.seconds += Math.floor(this.ticks / 10000000.0);
            this.ticks = this.ticks % 10000000.0;
        }
        if (this.seconds >= 60) {
            this.minutes += Math.floor(this.seconds / 60.0);
            this.seconds = this.seconds % 60.0;
        }
        if (this.minutes >= 60) {
            this.hours += Math.floor(this.minutes / 60.0);
            this.minutes = this.minutes % 60.0;
        }
        if (this.hours >= 24) {
            this.days += Math.floor(this.hours / 24.0);
            this.hours = this.hours % 24.0;
        }
        this.milliseconds = Math.floor(ticks / 10000);
        this.totalTicks = this.days * 864000000000 +
            this.hours * 36000000000 +
            this.minutes * 600000000 +
            this.seconds * 10000000 +
            this.ticks;
    }

    toNearestMillisecond() {
        return TimeSpan.fromTicks(Math.round(this.totalTicks / 10000) * 10000);
    }

    toNearestSecond() {
        return TimeSpan.fromTicks(Math.round(this.totalTicks / 10000000) * 10000000);
    }

    toNearestMinute() {
        return TimeSpan.fromTicks(Math.round(this.totalTicks / 600000000) * 600000000);
    }

    isZero() {
        return !this.days && !this.hours && !this.minutes && !this.seconds && !this.ticks;
    }

    add(other: TimeSpan) {
        return new TimeSpan(
            this.days + other.days,
            this.hours + other.hours,
            this.minutes + other.minutes,
            this.seconds + other.seconds,
            this.ticks + other.ticks
        );
    }

    sub(other: TimeSpan) {
        return new TimeSpan(
            this.days - other.days,
            this.hours - other.hours,
            this.minutes - other.minutes,
            this.seconds - other.seconds,
            this.ticks - other.ticks
        );
    }

    equals(other: TimeSpan | null | undefined) {
        if (other) {
            if (this === other) {
                return true;
            }
            return this.totalTicks === other.totalTicks;
        }
        return false;
    }

    compareTo(other: TimeSpan | null | undefined) {
        let result: number;
        if (other) {
            if (this === other) {
                result = 0;
            }
            else if (this.totalTicks > other.totalTicks) {
                result = 1;
            }
            else if (this.totalTicks < other.totalTicks) {
                result = -1;
            }
            else {
                result = 0;
            }
        }
        else {
            result = -1;
        }
        return result;
    }

    valueOf() { return this.totalTicks; }

    toJSON() {
        return this.toISOString();
    }

    toISOString() {
        const hours = this.hours.toString().padStart(2, '0');
        const minutes = this.minutes.toString().padStart(2, '0');
        const seconds = this.seconds.toString().padStart(2, '0');
        const ticks = this.ticks.toString().padStart(7, '0');
        return `${this.days}.${hours}:${minutes}:${seconds}.${ticks}`;
    }

    format() {
        let formatted: string;
        if (this.days || this.hours || this.minutes || this.seconds || this.milliseconds) {
            if (this.days && !this.hours && !this.minutes && !this.seconds && !this.milliseconds) {
                formatted = `${this.days} day`;
                if (this.days > 1) {
                    formatted += 's';
                }
            }
            else if (!this.days && this.hours && !this.minutes && !this.seconds && !this.milliseconds) {
                formatted = `${this.hours} hr`;
                if (this.hours > 1) {
                    formatted += 's';
                }
            }
            else if (!this.days && !this.hours && this.minutes && !this.seconds && !this.milliseconds) {
                formatted = `${this.minutes} min`;
                if (this.minutes > 1) {
                    formatted += 's';
                }
            }
            else if (!this.days && !this.hours && !this.minutes && this.seconds && !this.milliseconds) {
                formatted = `${this.seconds} sec`;
                if (this.seconds > 1) {
                    formatted += 's';
                }
            }
            else if (!this.days && !this.hours && !this.minutes && !this.seconds && this.milliseconds) {
                formatted = `${this.milliseconds} ms`;
            }
            else {
                if (this.days) {
                    formatted = `${this.days}.`;
                }
                else {
                    formatted = '';
                }
                formatted += `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
                if (this.seconds || this.ticks) {
                    formatted += `:${this.seconds.toString().padStart(2, '0')}`;
                    if (this.ticks) {
                        const remainder = this.ticks % 10000;
                        if (remainder) {
                            formatted += `.${this.ticks.toString().padStart(7, '0')}`;
                        }
                        else {
                            formatted += `.${this.milliseconds.toString().padStart(3, '0')}`;
                        }
                    }
                }
            }
        }
        else {
            formatted = '';
        }
        return formatted;
    }

    toString() {
        return this.format();
    }
}