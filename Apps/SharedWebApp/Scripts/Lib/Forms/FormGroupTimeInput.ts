import { TextComponent } from "../Components/TextComponent";
import { TimeInputControl } from "../Components/TimeInputControl";
import { TimeOnly } from "../TimeOnly";
import { FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupTimeInput extends FormGroup {
    private readonly inputControl: TimeInputControl;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupInputView | FormGroupInputView) {
        super(view);
        this.inputControl = this.addComponent(new TimeInputControl(view.inputView));
        this.setLabelFor(this.inputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }
    
    makeReadOnly(format: (time: TimeOnly) => string = FormGroupTimeInput.defaultReadOnlyFormat) {
        const value = this.inputControl.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: TimeOnly) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.inputControl.show();
        this.valueTextComponent.hide();
    }

    required() {
        this.inputControl.required();
    }

    notRequired() {
        this.inputControl.notRequired();
    }

    setCustomValidity(message: string) {
        this.inputControl.setCustomValidity(message);
    }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: TimeOnly) {
        this.inputControl.setValue(value);
    }
}