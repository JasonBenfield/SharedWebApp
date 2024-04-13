import { TimeSpan } from "../TimeSpan";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { ErrorList } from "./ErrorList";

export class TimeSpanDropDownFormGroup extends DropDownFormGroup<TimeSpan> {
    readonly constraints = new ConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}