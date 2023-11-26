import { DateTimeInputControl } from "../Components/DateTimeInputControl";
import { DateTimeOffset } from "../DateTimeOffset";
import { SimpleFieldFormGroupDateTimeInputView } from "../Views/FormGroup";
import { DateTimeConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class DateTimeInputFormGroup extends SimpleFieldFormGroup<DateTimeOffset> {
    readonly constraints = new DateTimeConstraintCollection();
    private readonly dateTimeInputControl: DateTimeInputControl;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupDateTimeInputView) {
        super(prefix, name, view);
        this.dateTimeInputControl = new DateTimeInputControl(view.dateTimeInput);
    }

    getValue() {
        return this.dateTimeInputControl.getValue();
    }

    setValue(value: DateTimeOffset) {
        this.dateTimeInputControl.setValue(value);
    }

    protected setCustomValidity(errorMessage: string) {
        this.dateTimeInputControl.setCustomValidity(errorMessage);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}