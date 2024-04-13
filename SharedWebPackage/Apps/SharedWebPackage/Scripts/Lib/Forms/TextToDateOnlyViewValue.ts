import { DateOnly } from "../DateOnly";
import { Month } from "../Month";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToDateOnlyViewValue extends TypedFieldViewValue<string, DateOnly> {
    private readonly format: (value: DateOnly) => string;

    constructor() {
        super();
        this.format = TextToDateOnlyViewValue.defaultFormat;
    }

    static defaultFormat(value: DateOnly) { return value ? value.toISOString() : ''; }

    protected _fromView(value: string) {
        if (value) {
            const match = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Day>\d{2})$/.exec(value);
            return new DateOnly(
                Number(match.groups.Year),
                Month.fromValue(Number(match.groups.Month)),
                Number(match.groups.Day)
            );
        }
        return null;
    }

    protected _toView(value: DateOnly) {
        return this.format(value);
    }
}