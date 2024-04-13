import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToTextViewValue extends TypedFieldViewValue<string, string> {
    private readonly transform: (value: string) => string;

    constructor(transform?: (v: string) => string) {
        super();
        this.transform = transform || TextToTextViewValue.defaultTransform;
    }

    static defaultTransform(text) { return text; }

    protected _fromView(value: string) {
        return value;
    }

    protected _toView(value: string) {
        return this.transform(value);
    }
}