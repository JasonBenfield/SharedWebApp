import numeral = require("numeral");
import { IFormattable } from "./MVVM/Types";

export class FormattedNumber implements IFormattable {
    static readonly currencyFormatString = "$0,0.00";

    static currency(value: number) {
        return new FormattedNumber(value, FormattedNumber.currencyFormatString);
    }

    private readonly formatted: string;

    constructor(readonly value: number, format: string) {
        this.formatted = numeral(value).format(format);
    }

    format() { return this.formatted; }

    toString() {
        return this.format();
    }
}