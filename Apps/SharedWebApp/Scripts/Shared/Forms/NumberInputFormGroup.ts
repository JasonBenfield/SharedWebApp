import { BlockViewModel } from "../Html/BlockViewModel";
import { NumberConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { TextToNumberViewValue } from "./TextToNumberViewValue";

export class NumberInputFormGroup extends InputFormGroup<number> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm, new TextToNumberViewValue());
    }

    readonly constraints = new NumberConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}