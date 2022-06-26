import { DateConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { SelectFormGroupView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";

export class DateDropDownFormGroup extends DropDownFormGroup<Date> {
    readonly constraints = new DateConstraintCollection();

    constructor(prefix: string, name: string, view: SelectFormGroupView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}