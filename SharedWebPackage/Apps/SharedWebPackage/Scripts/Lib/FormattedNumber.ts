import numeral = require("numeral");

export class FormattedNumber implements IFormattable {
    static currency(value: number) {
        return new FormattedNumber(value, '$0,0.00');
    }

    private readonly formatted: string;

    constructor(value: number, format: string) {
        this.formatted = numeral(value).format(format);
    }

    format() { return this.formatted; }

    toString() {
        return this.format();
    }
}