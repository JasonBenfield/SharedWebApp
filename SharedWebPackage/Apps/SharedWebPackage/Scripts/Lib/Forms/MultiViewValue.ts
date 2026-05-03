import { DateOnly } from "../Common";
import { TextToDateOnlyViewValue } from "./TextToDateOnlyViewValue";
import { TextToNumberViewValue } from "./TextToNumberViewValue";
import { TextToTextViewValue } from "./TextToTextViewValue";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class MultiViewValue extends TypedFieldViewValue<string, string | DateOnly | number> {
    private viewValue: TextToTextViewValue | TextToDateOnlyViewValue | TextToNumberViewValue;

    constructor(viewValue: TextToTextViewValue | TextToDateOnlyViewValue | TextToNumberViewValue) {
        super();
        this.viewValue = viewValue;
    }

    setViewValue(viewValue: TextToTextViewValue | TextToDateOnlyViewValue | TextToNumberViewValue) {
        this.viewValue = viewValue;
    }

    getValue = () => {
        return this.viewValue.getValue();
    }

    setValue = (value: string | DateOnly | number | null) => {
        if (this.viewValue instanceof TextToTextViewValue) {
            this.viewValue.setValue(value as string | null);
        }
        else if (this.viewValue instanceof TextToDateOnlyViewValue) {
            this.viewValue.setValue(value as DateOnly | null);
        }
        else if (this.viewValue instanceof TextToNumberViewValue) {
            this.viewValue.setValue(value as number | null);
        }
    }

    setValueFromView = (viewValue: string) => {
        return this.viewValue.setValueFromView(viewValue);
    }

    toView() {
        return this.viewValue.toView();
    }
}