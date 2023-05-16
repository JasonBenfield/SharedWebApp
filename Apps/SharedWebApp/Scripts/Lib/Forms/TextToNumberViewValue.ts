import { FormattedNumber } from "../FormattedNumber";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToNumberViewValue extends TypedFieldViewValue<string, number> {
    private _format = '';

    constructor(format: string = '') {
        super();
        this._format = format;
    }

    get format() { return this._format; }

    set format(format: string) { this._format = format; }

    protected _fromView(value: string) {
        let numericValue: number = null;
        if (value) {
            value = value.replace(/[,|$]+/g, '');
            if (value) {
                numericValue = parseFloat(value);
                if (Number.isNaN(numericValue)) {
                    numericValue = null;
                }
            }
        }
        return numericValue;
    }

    protected _toView(value: number) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return '';
        }
        return this.format ? new FormattedNumber(value, this.format).toString() : value.toString();
    }
}