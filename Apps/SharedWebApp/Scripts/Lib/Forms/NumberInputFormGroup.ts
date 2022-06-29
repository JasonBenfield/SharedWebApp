import { NumberConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { TextToNumberViewValue } from "./TextToNumberViewValue";

export class NumberInputFormGroup extends InputFormGroup<number> {
    readonly constraints = new NumberConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToNumberViewValue());
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}