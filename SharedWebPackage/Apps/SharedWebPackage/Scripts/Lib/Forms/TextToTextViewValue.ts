import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToTextViewValue extends TypedFieldViewValue<string, string> {
    private readonly transform: (value: any) => string;

    constructor(transform?: (v: string | null) => string) {
        super();
        this.transform = transform || TextToTextViewValue.defaultTransform;
    }

    static defaultTransform(text) { return text; }

    protected _fromView(value: string | null) {
        return value;
    }

    protected _toView(value: any) {
        return this.transform(value);
    }
}