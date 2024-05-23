import { CssLengthUnit } from "../CssLengthUnit";
import { TextToTimeOnlyViewValue } from "../Forms/TextToTimeOnlyViewValue";
import { TimeOnly } from "../TimeOnly";
import { InputView } from "../Views/InputView";
import { InputControl } from "./InputControl";

export class TimeInputControl extends InputControl<TimeOnly> {
    constructor(view: InputView) {
        super(view, new TextToTimeOnlyViewValue());
        view.setType('time');
        view.setMaxWidth(CssLengthUnit.em(10));
    }

    setType: (type: 'time') => void;

    required() {
        this.view.required();
    }

    notRequired() {
        this.view.notRequired();
    }

    setCustomValidity(message: string) {
        this.view.setCustomValidity(message);
    }

    setValue(value: TimeOnly) {
        if (value.seconds) {
            this.view.setStep('1');
        }
        else {
            this.view.setStep('60');
        }
        super.setValue(value);
    }

}