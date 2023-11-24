import { DateTimeInputControl } from "../Components/DateTimeInputControl";
import { FormGroupDateTimeInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupDateTimeInput extends FormGroup {
    private readonly inputControl: DateTimeInputControl;

    constructor(view: FormGroupDateTimeInputView) {
        super(view);
        this.inputControl = this.addComponent(new DateTimeInputControl(view.dateTimeInput));
    }

    includeSeconds() { this.inputControl.includeSeconds(); }

    excludeSeconds() { this.inputControl.excludeSeconds(); }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: Date) {
        this.inputControl.setValue(value);
    }
}