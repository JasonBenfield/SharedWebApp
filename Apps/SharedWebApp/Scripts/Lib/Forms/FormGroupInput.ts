import { InputControl } from "../Components/InputControl";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class FormGroupInput<TValue> extends FormGroup {
    private readonly inputControl: InputControl<TValue>;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupInputView | FormGroupInputGroupView, viewValue: TypedFieldViewValue<string, TValue>) {
        super(view);
        this.inputControl = this.addComponent(new InputControl(view.input, viewValue));
        this.setLabelFor(this.inputControl);
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }
    
    makeReadOnly() {
        const value = this.inputControl.getTextValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(value);
    }

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

    setValue(value: TValue) {
        this.inputControl.setValue(value);
    }

    setType(type: 'text' | 'hidden' | 'date' | 'number' | 'time' | 'file' | 'email' | 'month' | 'url') {
        this.inputControl.setType(type);
    }

    setInputMode(inputmode: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url') {
        this.inputControl.setInputMode(inputmode);
    }

    addDataList(...values: TValue[]) {
        return this.inputControl.addDataList(...values);
    }
}