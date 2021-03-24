import { BlockViewModel } from "../Html/BlockViewModel";
import { DateConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { TextToDateViewValue } from "./TextToDateViewValue";

export class DateInputFormGroup extends InputFormGroup<Date> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm, new TextToDateViewValue());
        this.input.setType('date');
    }

    readonly constraints = new DateConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}