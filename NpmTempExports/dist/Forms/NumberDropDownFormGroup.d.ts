import { NumberConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
export declare class NumberDropDownFormGroup extends DropDownFormGroup<number> {
    readonly constraints: NumberConstraintCollection;
    constructor(prefix: string, name: string, view: DropDownFormGroupView<number>);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
