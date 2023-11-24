import { CssLengthUnit } from "../CssLengthUnit";
import { DateOnly } from "../DateOnly";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { DateConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldInputFormGroup } from "./SimpleFieldInputFormGroup";
import { TextToDateOnlyViewValue } from "./TextToDateOnlyViewValue";

export class DateInputFormGroup extends SimpleFieldInputFormGroup<DateOnly> {
    readonly constraints = new DateConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToDateOnlyViewValue());
        this.view.input.setType('date');
        this.view.input.setMaxWidth(CssLengthUnit.em(10));
    }
    
    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}