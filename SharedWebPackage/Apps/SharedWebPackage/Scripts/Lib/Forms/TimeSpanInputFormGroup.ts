import { TimeSpanInputControl } from "../Components/TimeSpanInputControl";
import { TimeSpan } from "../TimeSpan";
import { SimpleFieldFormGroupTimeSpanInputView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class TimeSpanInputFormGroup extends SimpleFieldFormGroup<TimeSpan> {
    readonly constraints = new ConstraintCollection();
    private readonly timeSpanInputControl: TimeSpanInputControl;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupTimeSpanInputView) {
        super(prefix, name, view);
        this.timeSpanInputControl = new TimeSpanInputControl(view.timeSpanInputView);
    }

    getValue() {
        return this.timeSpanInputControl.getValue();
    }

    setValue(value: TimeSpan) {
        this.timeSpanInputControl.setValue(value);
    }

    protected setCustomValidity(errorMessage: string) {
        this.timeSpanInputControl.setCustomValidity(errorMessage);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}