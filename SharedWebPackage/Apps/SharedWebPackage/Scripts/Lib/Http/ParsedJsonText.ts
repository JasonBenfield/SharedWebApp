import { ParsedString } from "./ParsedString";

export class ParsedJsonText {
    private readonly _value: any;

    private static reviver = (key: string, value: any) => {
        if (typeof value === 'string') {
            value = new ParsedString(value).value;
        }
        return value;
    }

    constructor(text: string) {
        this._value = JSON.parse(text, ParsedJsonText.reviver);
    }

    get value() { return this._value; }
}