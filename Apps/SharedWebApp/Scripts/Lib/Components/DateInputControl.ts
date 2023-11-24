import { CssLengthUnit } from "../CssLengthUnit";
import { DateOnly } from "../DateOnly";
import { TextToDateOnlyViewValue } from "../Forms/TextToDateOnlyViewValue";
import { InputView } from "../Views/InputView";
import { InputControl } from "./InputControl";

export class DateInputControl extends InputControl<DateOnly> {
    constructor(view: InputView) {
        super(view, new TextToDateOnlyViewValue());
        view.setType('date');
        view.setMaxWidth(CssLengthUnit.em(10));
    }

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }

    setCustomValidity(message: string) {
        this.view.setCustomValidity(message);
    }
}