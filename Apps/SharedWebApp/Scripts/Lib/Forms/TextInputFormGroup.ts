import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { TextConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldInputFormGroup } from "./SimpleFieldInputFormGroup";
import { TextToTextViewValue } from "./TextToTextViewValue";

export class TextInputFormGroup extends SimpleFieldInputFormGroup<string> {
    readonly constraints = new TextConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToTextViewValue());
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}