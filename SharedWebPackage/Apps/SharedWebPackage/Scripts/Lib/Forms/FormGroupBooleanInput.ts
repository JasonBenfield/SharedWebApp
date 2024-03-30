import { BooleanInputControl } from "../Components/BooleanInputControl";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupBooleanInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupBooleanInput extends FormGroup {
    private readonly inputControl: BooleanInputControl;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupBooleanInputView) {
        super(view);
        this.inputControl = this.addComponent(new BooleanInputControl(view.inputView));
        this.setLabelFor(this.inputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    makeReadOnly(format: (date: boolean) => string = FormGroupBooleanInput.defaultReadOnlyFormat) {
        const value = this.inputControl.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format(value));
    }

    private static readonly defaultReadOnlyFormat = (value: boolean) => value ? value.toLocaleString() : '';

    makeEditable() {
        this.inputControl.show();
        this.valueTextComponent.hide();
    }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: boolean) {
        this.inputControl.setValue(value);
    }
}