import { ConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";

export class BooleanDropDownFormGroup extends DropDownFormGroup<boolean> {
    readonly constraints = new ConstraintCollection();

    constructor(prefix: string, name: string, view: DropDownFormGroupView<boolean>) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}