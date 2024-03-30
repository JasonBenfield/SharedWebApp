import { FormattedNumber } from "../FormattedNumber";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToNumberViewValue extends TypedFieldViewValue<string, number> {
    private _formatString = '';

    constructor(format?: string) {
        super();
        this._formatString = format;
    }

    get format() { return this._formatString; }

    set format(format: string) { this._formatString = format; }

    private defaultFormat(value: number) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return '';
        }
        return this._formatString ? new FormattedNumber(value, this._formatString).toString() : value.toString();
    }

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
        return this.defaultFormat(value);
    }
}