import { NumberConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";

export class NumberDropDownFormGroup extends DropDownFormGroup<number> {
    readonly constraints = new NumberConstraintCollection();

    constructor(prefix: string, name: string, view: DropDownFormGroupView<number>) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}