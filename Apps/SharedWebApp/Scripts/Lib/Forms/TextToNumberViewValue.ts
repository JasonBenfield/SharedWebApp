import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class TextToNumberViewValue extends TypedFieldViewValue<string, number> {
    protected _fromView(value: string) {
        return value ? Number(value) : null;
    }

    protected _toView(value: number) {
        return value ? value.toString() : '';
    }
}