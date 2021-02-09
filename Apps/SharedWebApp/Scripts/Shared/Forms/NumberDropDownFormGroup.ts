import { BlockViewModel } from "../Html/BlockViewModel";
import { NumberConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { ErrorList } from "./ErrorList";

export class NumberDropDownFormGroup extends DropDownFormGroup<number> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm);
    }

    readonly constraints = new NumberConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}