import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { NumberConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldInputFormGroup } from "./SimpleFieldInputFormGroup";
import { TextToNumberViewValue } from "./TextToNumberViewValue";

export class NumberInputFormGroup extends SimpleFieldInputFormGroup<number> {
    protected readonly viewValue: TextToNumberViewValue;
    readonly constraints = new NumberConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToNumberViewValue());
    }

    get format() { return this.viewValue.format; }

    set format(format: string) { this.viewValue.format = format; }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}