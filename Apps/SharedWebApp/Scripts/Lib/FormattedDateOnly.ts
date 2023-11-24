
export class FormattedDateOnly {
    private readonly dateOptions: Intl.DateTimeFormatOptions;

    constructor(
        private readonly value: Date,
        options?: Intl.DateTimeFormatOptions
    ) {
        this.dateOptions = { month: 'numeric', day: 'numeric', year: '2-digit' };
        if (options) {
            this.dateOptions.day = options.day;
            this.dateOptions.weekday = options.weekday;
            this.dateOptions.year = options.year;
            this.dateOptions.month = options.month;
        }
    }

    formatDate() {
        return this.value ? this.value.toLocaleDateString([], this.dateOptions) : '';
    }
    
    toString() {
        return this.formatDate();
    }
}