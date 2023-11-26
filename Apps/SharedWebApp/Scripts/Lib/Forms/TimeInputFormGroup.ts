import { TimeInputControl } from "../Components/TimeInputControl";
import { TimeOnly } from "../TimeOnly";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { TimeConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class TimeInputFormGroup extends SimpleFieldFormGroup<TimeOnly> {
    readonly constraints = new TimeConstraintCollection();
    private readonly timeInputControl: TimeInputControl;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view);
        this.timeInputControl = new TimeInputControl(view.input);
    }

    getValue() {
        return this.timeInputControl.getValue();
    }

    setValue(value: TimeOnly) {
        this.timeInputControl.setValue(value);
    }

    protected setCustomValidity(errorMessage: string) {
        this.timeInputControl.setCustomValidity(errorMessage);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}