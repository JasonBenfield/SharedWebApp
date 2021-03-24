import { BlockViewModel } from "../Html/BlockViewModel";
import { DateConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { ErrorList } from "./ErrorList";

export class DateDropDownFormGroup extends DropDownFormGroup<Date> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm);
    }

    readonly constraints = new DateConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}