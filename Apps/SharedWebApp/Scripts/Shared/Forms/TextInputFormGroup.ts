import { TextConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { InputFormGroupView } from "./InputFormGroupView";
import { TextToTextViewValue } from "./TextToTextViewValue";

export class TextInputFormGroup extends InputFormGroup<string> {
    readonly constraints = new TextConstraintCollection();

    constructor(prefix: string, name: string, view: InputFormGroupView) {
        super(prefix, name, view, new TextToTextViewValue());
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}