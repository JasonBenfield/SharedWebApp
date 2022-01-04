import { ConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
export declare class BooleanDropDownFormGroup extends DropDownFormGroup<boolean> {
    readonly constraints: ConstraintCollection;
    constructor(prefix: string, name: string, view: DropDownFormGroupView<boolean>);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
