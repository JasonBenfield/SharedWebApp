import { TextConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { InputFormGroupView } from "./InputFormGroupView";
export declare class TextInputFormGroup extends InputFormGroup<string> {
    readonly constraints: TextConstraintCollection;
    constructor(prefix: string, name: string, view: InputFormGroupView);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
