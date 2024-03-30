import { TimeSpan } from "../TimeSpan";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToTimeSpanViewValue extends TypedFieldViewValue<string, TimeSpan> {
    private readonly format: (value: TimeSpan) => string;

    constructor() {
        super();
        this.format = TextToTimeSpanViewValue.defaultFormat;
    }

    static defaultFormat(value: TimeSpan) { return value ? value.toISOString() : ''; }

    protected _fromView(value: string) {
        if (value && TimeSpan.canParse(value)) {
            return TimeSpan.parse(value);
        }
        return null;
    }

    protected _toView(value: TimeSpan) {
        return this.format(value);
    }
}