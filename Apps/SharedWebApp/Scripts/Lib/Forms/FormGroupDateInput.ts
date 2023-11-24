import { DateInputControl } from "../Components/DateInputControl";
import { DateOnly } from "../DateOnly";
import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupDateInput extends FormGroup {
    private readonly dateInputControl: DateInputControl;

    constructor(view: FormGroupInputView | FormGroupInputGroupView) {
        super(view);
        this.dateInputControl = this.addComponent(new DateInputControl(view.input));
    }

    getValue() { return this.dateInputControl.getValue(); }

    setValue(value: DateOnly) {
        this.dateInputControl.setValue(value);
    }
}