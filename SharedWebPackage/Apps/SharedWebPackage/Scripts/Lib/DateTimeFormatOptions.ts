
export class DateTimeFormatOptions {
    private readonly options: Intl.DateTimeFormatOptions;
    private _isTimeIncludedWhenMidnight = false;
    private _fractionalSecondDigits: 1 | 2 | 3 = undefined;

    constructor(options?: Intl.DateTimeFormatOptions) {
        this.options = {
            month: 'numeric', day: 'numeric', year: '2-digit',
            hour: 'numeric', minute: '2-digit'
        };
        if (options) {
            for (const key in options) {
                const prop = options[key];
                if (prop !== undefined) {
                    this.options[key] = prop;
                }
            }
        }
    }

    get isTimeIncludedWhenMidnight() { return this._isTimeIncludedWhenMidnight; }
    
    includeTimeWhenMidnight() {
        this._isTimeIncludedWhenMidnight = true;
        return this;
    }

    useLongNameOfWeekday() {
        this.options.weekday = 'long';
        return this;
    }

    useShortNameOfWeekday() {
        this.options.weekday = 'short';
        return this;
    }

    useNarrowNameOfWeekday() {
        this.options.weekday = 'narrow';
        return this;
    }

    useLongDayPeriod() {
        this.options.hour12 = true;
        this.options.dayPeriod = 'long';
        return this;
    }

    useShortDayPeriod() {
        this.options.hour12 = true;
        this.options.dayPeriod = 'short';
        return this;
    }

    useNarrowDayPeriod() {
        this.options.hour12 = true;
        this.options.dayPeriod = 'narrow';
        return this;
    }

    useShortNameOfMonth() {
        this.options.month = 'short';
        return this;
    }

    useLongNameOfMonth() {
        this.options.month = 'long';
        return this;
    }

    useNarrowNameOfMonth() {
        this.options.month = 'narrow';
        return this;
    }

    useFullYear() {
        this.options.year = 'numeric';
        return this;
    }

    useHour12() {
        this.options.hour12 = true;
        return this;
    }
    
    useNumericSeconds() {
        this.options.second = 'numeric';
        return this;
    }

    use2DigitSeconds() {
        this.options.second = '2-digit';
        return this;
    }

    useMilliseconds(fractionalSecondDigits?: 1 | 2 | 3) {
        this._fractionalSecondDigits = fractionalSecondDigits || 3;
        return this;
    }

    useFullDateStyle() {
        this.options.dateStyle = 'full';
        return this;
    }

    useLongDateStyle() {
        this.options.dateStyle = 'long';
        return this;
    }

    useMediumDateStyle() {
        this.options.dateStyle = 'medium';
        return this;
    }

    useShortDateStyle() {
        this.options.dateStyle = 'short';
        return this;
    }

    useFullTimeStyle() {
        this.options.timeStyle = 'full';
        return this;
    }

    useLongTimeStyle() {
        this.options.timeStyle = 'long';
        return this;
    }

    useMediumTimeStyle() {
        this.options.timeStyle = 'medium';
        return this;
    }

    useShortTimeStyle() {
        this.options.timeStyle = 'short';
        return this;
    }

    getDateOptions() {
        return <Intl.DateTimeFormatOptions>{
            dateStyle: this.options.dateStyle,
            day: this.options.day,
            month: this.options.month,
            year: this.options.year,
            era: this.options.era,
            weekday: this.options.weekday,
            calendar: this.options.calendar,
            formatMatcher: this.options.formatMatcher,
            localeMatcher: this.options.localeMatcher,
            numberingSystem: this.options.numberingSystem
        };
    }

    getTimeOptions() {
        return <Intl.DateTimeFormatOptions>{
            hour: this.options.hour,
            hour12: this.options.hour12,
            hourCycle: this.options.hourCycle,
            dayPeriod: this.options.dayPeriod,
            minute: this.options.minute,
            second: this.options.second,
            fractionalSecondDigits: this._fractionalSecondDigits,
            timeZone: this.options.timeZone,
            timeZoneName: this.options.timeZoneName,
            timeStyle: this.options.timeStyle,
            calendar: this.options.calendar,
            formatMatcher: this.options.formatMatcher,
            localeMatcher: this.options.localeMatcher,
            numberingSystem: this.options.numberingSystem
        };
    }
}