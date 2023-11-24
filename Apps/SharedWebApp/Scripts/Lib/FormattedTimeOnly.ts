
export class FormattedTimeOnly {
    private readonly timeOptions: Intl.DateTimeFormatOptions;

    constructor(
        private readonly value: Date,
        options?: Intl.DateTimeFormatOptions
    ) {
        this.timeOptions = { hour: 'numeric', minute: '2-digit' };
        if (options) {
            this.timeOptions.hour = options.hour;
            this.timeOptions.hour12 = options.hour12;
            this.timeOptions.minute = options.minute;
            this.timeOptions.second = options.second;
            this.timeOptions.timeZone = options.timeZone;
            this.timeOptions.timeZoneName = options.timeZoneName;
        }
    }
    
    formatTime() {
        return this.value ? this.value.toLocaleTimeString([], this.timeOptions) : '';
    }
    
    toString() {
        return this.formatTime();
    }
}