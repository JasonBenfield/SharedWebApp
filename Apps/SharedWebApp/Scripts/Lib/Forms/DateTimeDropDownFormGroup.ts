import { DateTimeOffset } from "../DateTimeOffset";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { DateTimeConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { ErrorList } from "./ErrorList";

export class DateTimeDropDownFormGroup extends DropDownFormGroup<DateTimeOffset> {
    readonly constraints = new DateTimeConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}