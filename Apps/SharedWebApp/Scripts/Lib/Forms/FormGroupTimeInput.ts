import { TimeInputControl } from "../Components/TimeInputControl";
import { TimeOnly } from "../TimeOnly";
import { FormGroupTimeInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupTimeInput extends FormGroup {
    private readonly inputControl: TimeInputControl;

    constructor(view: FormGroupTimeInputView) {
        super(view);
        this.inputControl = this.addComponent(new TimeInputControl(view.timeInput));
    }

    includeSeconds() { this.inputControl.includeSeconds(); }

    excludeSeconds() { this.inputControl.excludeSeconds(); }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: TimeOnly) {
        this.inputControl.setValue(value);
    }
}