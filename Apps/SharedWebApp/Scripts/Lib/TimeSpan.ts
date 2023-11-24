
export class TimeSpan {

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

    static dateDiff(date1: Date, date2: Date) {
        return TimeSpan.fromMilliseconds(date1.getTime() - date2.getTime());
    }

    static fromDays(value: number) {
        return TimeSpan.fromMinutes(value * 24);
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

    constructor(readonly days: number, readonly hours: number, readonly minutes: number, readonly seconds: number, readonly ticks: number) {
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

    equals(other: TimeSpan) {
        if (other) {
            return this.days === other.days &&
                this.hours === other.hours &&
                this.minutes === other.minutes &&
                this.seconds === other.seconds &&
                this.ticks === other.ticks;
        }
        return false;
    }

    toJSON() {
        const hours = this.hours.toString().padStart(2, '0');
        const minutes = this.minutes.toString().padStart(2, '0');
        const seconds = this.seconds.toString().padStart(2, '0');
        const ticks = this.ticks.toString().padStart(7, '0');
        return `${this.days}.${hours}:${minutes}:${seconds}.${ticks}`;
    }

    toString() {
        let str = '';
        if (this.days > 0) {
            str += `${this.days}.`;
        }
        if (this.hours || this.minutes) {
            const hours = this.hours.toString().padStart(2, '0');
            const minutes = this.minutes.toString().padStart(2, '0');
            str += `${hours}:${minutes}`;
        }
        if (this.seconds > 0 || this.ticks > 0) {
            if (this.hours || this.minutes) {
                str += `:${this.seconds.toString().padStart(2, '0')}`;
            }
            else {
                str += `${this.seconds.toString()}`;
            }
        }
        if (this.ticks > 0) {
            const ticks = this.ticks % 10000 === 0
                ? this.milliseconds.toString().padStart(3, '0')
                : this.ticks.toString().padStart(7, '0');
            str += `.${ticks}`;
        }
        if (!this.days && !this.hours && !this.minutes) {
            str += ' s';
        }
        return str;
    }
}