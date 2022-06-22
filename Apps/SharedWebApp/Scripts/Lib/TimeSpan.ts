import _ = require("lodash");

export class TimeSpan {

    private static readonly regex = /(?<days>\d+\.)?(?<hours>\d{1,2}):(?<minutes>\d{1,2}):?(?<seconds>\d{1,2})?(\.(?<ticks>\d+))?/;

    static canParse(text: string) { return TimeSpan.regex.test(text); }

    static parse(text: string) {
        const match = TimeSpan.regex.exec(text);
        return new TimeSpan(
            Number(match.groups.days || '0'),
            Number(match.groups.hours || '0'),
            Number(match.groups.minutes || '0'),
            Number(match.groups.seconds || '0'),
            Number(match.groups.ticks || '0')
        );
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

    toString() {
        let str = '';
        if (this.days > 0) {
            str += `${this.days}.`;
        }
        const hours = this.hours.toString().padStart(2, '0');
        const minutes = this.minutes.toString().padStart(2, '0');
        str += `${hours}:${minutes}`;
        if (this.seconds > 0 || this.ticks > 0) {
            str += `:${this.seconds.toString().padStart(2, '0')}`;
        }
        if (this.ticks > 0) {
            const ticks = this.ticks % 10000 === 0
                ? this.milliseconds.toString().padStart(3, '0')
                : this.ticks.toString().padStart(7, '0');
            str += `.${ticks}`;
        }
        return str;
    }
}