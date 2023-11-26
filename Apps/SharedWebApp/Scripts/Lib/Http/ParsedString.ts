import { DateOnly } from "../DateOnly";
import { DateTimeOffset } from "../DateTimeOffset";
import { TimeOnly } from "../TimeOnly";
import { TimeSpan } from "../TimeSpan";

export class ParsedString {
    private readonly _value: any;
    private static readonly dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
    private static readonly dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{0,7})?(\s*([\+\-]\d{2}:\d{2})|Z)?$/;

    constructor(value: string) {
        if (ParsedString.dateOnlyRegex.test(value)) {
            this._value = DateOnly.parse(value);
        }
        else if (ParsedString.dateRegex.test(value)) {
            this._value = DateTimeOffset.parse(value);
        }
        else if (TimeOnly.canParse(value)) {
            this._value = TimeOnly.parse(value);
        }
        else if (TimeSpan.canParse(value)) {
            this._value = TimeSpan.parse(value);
        }
        else {
            this._value = value;
        }
    }

    get value() { return this._value; }
}