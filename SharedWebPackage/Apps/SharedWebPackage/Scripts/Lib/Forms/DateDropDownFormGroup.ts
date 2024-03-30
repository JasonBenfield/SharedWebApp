import { DateOnly } from "../DateOnly";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { DateConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { ErrorList } from "./ErrorList";

export class DateDropDownFormGroup extends DropDownFormGroup<DateOnly> {
    readonly constraints = new DateConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}