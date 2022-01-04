import { TextConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
export declare class TextDropDownFormGroup extends DropDownFormGroup<string> {
    readonly constraints: TextConstraintCollection;
    constructor(prefix: string, name: string, view: DropDownFormGroupView<string>);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
