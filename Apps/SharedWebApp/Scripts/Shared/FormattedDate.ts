
export class FormattedDate {
    private readonly dateOptions: Intl.DateTimeFormatOptions;
    private readonly timeOptions: Intl.DateTimeFormatOptions;

    constructor(
        private readonly value: Date,
        options?: Intl.DateTimeFormatOptions
    ) {
        this.dateOptions = { month: 'numeric', day: 'numeric', year: '2-digit' };
        this.timeOptions = { hour: 'numeric', minute: '2-digit' };
        if (options) {
            this.dateOptions.day = options.day;
            this.dateOptions.weekday = options.weekday;
            this.dateOptions.year = options.year;
            this.dateOptions.month = options.month;
            this.timeOptions.hour = options.hour;
            this.timeOptions.hour12 = options.hour12;
            this.timeOptions.minute = options.minute;
            this.timeOptions.second = options.second;
            this.timeOptions.timeZone = options.timeZone;
            this.timeOptions.timeZoneName = options.timeZoneName;
        }
    }

    formatDate() {
        return this.value ? this.value.toLocaleDateString([], this.dateOptions) : '';
    }

    formatTime() {
        return this.value ? this.value.toLocaleTimeString([], this.timeOptions) : '';
    }

    formatDateTime() {
        if (this.value) {
            if (
                this.value.getHours() === 0 &&
                this.value.getMinutes() === 0 &&
                this.value.getSeconds() === 0 &&
                this.value.getMilliseconds() === 0
            ) {
                return this.formatDate();
            }
            return this.formatDate() + ' ' + this.formatTime();
        }
        return '';
    }

    toString() {
        return this.formatDateTime();
    }
}