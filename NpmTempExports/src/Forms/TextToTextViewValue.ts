import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToTextViewValue extends TypedFieldViewValue<string, string> {
    protected _fromView(value: string) {
        return value;
    }

    protected _toView(value: string) {
        return value;
    }
}