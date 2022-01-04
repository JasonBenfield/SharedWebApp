import { NumberConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { InputFormGroupView } from "./InputFormGroupView";
export declare class NumberInputFormGroup extends InputFormGroup<number> {
    readonly constraints: NumberConstraintCollection;
    constructor(prefix: string, name: string, view: InputFormGroupView);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
