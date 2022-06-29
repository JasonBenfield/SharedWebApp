import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToNumberViewValue extends TypedFieldViewValue<string, number> {
    protected _fromView(value: string) {
        if (value) {
            value = value.replace(/[,|$]+/g, '');
        }
        return value ? parseFloat(value) : null;
    }

    protected _toView(value: number) {
        return value ? value.toString() : '';
    }
}