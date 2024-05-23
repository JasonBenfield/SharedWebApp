import { CssLengthUnit } from "../CssLengthUnit";
import { TextToTimeOnlyViewValue } from "../Forms/TextToTimeOnlyViewValue";
import { TimeOnly } from "../TimeOnly";
import { InputView } from "../Views/InputView";
import { InputControl } from "./InputControl";

export class TimeInputControl extends InputControl<TimeOnly> {
    private step = '60';

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
        if (value && value.seconds) {
            this.setTimeStep('1');
        }
        else {
            this.setTimeStep('60');
        }
        super.setValue(value);
    }

    private setTimeStep(step: string) {
        if (this.step !== step) {
            this.view.setStep(step);
            this.step = step;
        }
    }
}