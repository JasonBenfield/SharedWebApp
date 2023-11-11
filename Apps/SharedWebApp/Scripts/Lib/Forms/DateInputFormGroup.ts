import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { DateConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldInputFormGroup } from "./SimpleFieldInputFormGroup";
import { TextToDateViewValue } from "./TextToDateViewValue";

export class DateInputFormGroup extends SimpleFieldInputFormGroup<Date> {
    readonly constraints = new DateConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToDateViewValue());
        this.view.input.setType('date');
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}