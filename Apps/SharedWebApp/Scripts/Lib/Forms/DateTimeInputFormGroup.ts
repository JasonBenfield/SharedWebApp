import { DateTimeInputControl } from "../Components/DateTimeInputControl";
import { SimpleFieldFormGroupDateTimeInputView } from "../Views/FormGroup";
import { DateTimeConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class DateTimeInputFormGroup extends SimpleFieldFormGroup<Date> {
    readonly constraints = new DateTimeConstraintCollection();
    private readonly dateTimeInputControl: DateTimeInputControl;

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupDateTimeInputView) {
        super(prefix, name, view);
        this.dateTimeInputControl = new DateTimeInputControl(view.dateTimeInput);
    }

    getValue() {
        return this.dateTimeInputControl.getValue();
    }

    setValue(value: Date) {
        this.dateTimeInputControl.setValue(value);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}