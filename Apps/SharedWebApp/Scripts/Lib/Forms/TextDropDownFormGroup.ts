import { TextConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { SelectFormGroupView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";

export class TextDropDownFormGroup extends DropDownFormGroup<string> {
    readonly constraints = new TextConstraintCollection();

    constructor(prefix: string, name: string, view: SelectFormGroupView) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}