import { BlockViewModel } from "../Html/BlockViewModel";
import { TextConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { TextToTextViewValue } from "./TextToTextViewValue";

export class TextInputFormGroup extends InputFormGroup<string> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm, new TextToTextViewValue());
    }

    readonly constraints = new TextConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}