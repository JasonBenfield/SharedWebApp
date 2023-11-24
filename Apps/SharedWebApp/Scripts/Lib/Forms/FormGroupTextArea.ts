import { TextAreaControl } from "../Components/TextAreaControl";
import { TextComponent } from "../Components/TextComponent";
import { FormGroupTextAreaView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupTextArea extends FormGroup {
    private readonly textAreaControl: TextAreaControl;
    private readonly valueTextComponent: TextComponent;

    constructor(view: FormGroupTextAreaView) {
        super(view);
        this.textAreaControl = this.addComponent(new TextAreaControl(view.textArea));
        this.valueTextComponent = this.addComponent(new TextComponent(view.valueTextView));
    }

    makeReadOnly() {
        const value = this.textAreaControl.getValue();
        this.textAreaControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(value ? value.toString() : '');
    }

    makeEditable() {
        this.textAreaControl.show();
        this.valueTextComponent.hide();
    }

    required() {
        this.textAreaControl.required();
    }

    notRequired() {
        this.textAreaControl.notRequired();
    }

    setCustomValidity(message: string) {
        this.textAreaControl.setCustomValidity(message);
    }

    getValue() { return this.textAreaControl.getValue(); }

    setValue(value: string) {
        this.textAreaControl.setValue(value);
    }
}