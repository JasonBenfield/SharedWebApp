import numeral = require("numeral");

export class FormattedNumber {
    static currency(value: number) {
        return new FormattedNumber(value, '$0,0.00');
    }

    private readonly formatted: string;

    constructor(value: number, format: string) {
        this.formatted = numeral(value).format(format);
    }

    toString() {
        return this.formatted;
    }
}