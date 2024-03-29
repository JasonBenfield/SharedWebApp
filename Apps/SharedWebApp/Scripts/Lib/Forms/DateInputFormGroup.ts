﻿import { DateConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { TextToDateViewValue } from "./TextToDateViewValue";

export class DateInputFormGroup extends InputFormGroup<Date> {
    readonly constraints = new DateConstraintCollection();

    constructor(prefix: string, name: string, view: SimpleFieldFormGroupInputView) {
        super(prefix, name, view, new TextToDateViewValue());
        this.view.input.setType('date');
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }
}