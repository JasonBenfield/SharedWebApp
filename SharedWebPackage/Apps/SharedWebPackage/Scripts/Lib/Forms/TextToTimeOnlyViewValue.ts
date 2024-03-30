import { TimeOnly } from "../TimeOnly";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToTimeOnlyViewValue extends TypedFieldViewValue<string, TimeOnly> {
    static readonly regex = /^(?<Hour>\d{2}):(?<Minute>\d{2})(:(?<Second>\d{2})(.(?<Tick>\d{7}))?)?$/;

    private readonly format: (value: TimeOnly) => string;

    constructor() {
        super();
        this.format = TextToTimeOnlyViewValue.defaultFormat;
    }

    static defaultFormat(value: TimeOnly) {
        if (value) {
            const hours = value.hours.toString().padStart(2, '0');
            const minutes = value.minutes.toString().padStart(2, '0');
            const seconds = value.seconds.toString().padStart(2, '0');
            let formatted = `${hours}:${minutes}`;
            if (seconds) {
                formatted += `:${seconds}`;
            }
            return formatted;
        }
        return '';
    }

    protected _fromView(value: string) {
        if (value) {
            const match = TextToTimeOnlyViewValue.regex.exec(value);
            const timeOnly = new TimeOnly(
                Number(match.groups.Hour),
                Number(match.groups.Minute),
                Number(match.groups.Second || '0')
            );
            return timeOnly;
        }
        return null;
    }

    protected _toView(value: TimeOnly) {
        return this.format(value);
    }
}