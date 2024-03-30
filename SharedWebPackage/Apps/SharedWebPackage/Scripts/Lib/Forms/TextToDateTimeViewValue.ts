import { DateTimeOffset } from "../DateTimeOffset";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToDateTimeViewValue extends TypedFieldViewValue<string, DateTimeOffset> {
    private readonly format: (value: DateTimeOffset) => string;

    constructor() {
        super();
        this.format = TextToDateTimeViewValue.defaultFormat;
    }

    static defaultFormat(value: DateTimeOffset) { return value ? value.toISOString() : ''; }

    protected _fromView(value: string) {
        if (value) {
            const match = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Day>\d{2})$/.exec(value);
            return new Date(
                Number(match.groups.Year),
                Number(match.groups.Month) - 1,
                Number(match.groups.Day)
            );
        }
        return null;
    }

    protected _toView(value: DateTimeOffset) {
        return this.format(value);
    }
}