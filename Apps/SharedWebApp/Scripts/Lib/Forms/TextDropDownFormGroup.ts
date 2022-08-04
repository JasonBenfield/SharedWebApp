import { TextConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";

export class TextDropDownFormGroup extends DropDownFormGroup<string> {
    readonly constraints = new TextConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupSelectView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}