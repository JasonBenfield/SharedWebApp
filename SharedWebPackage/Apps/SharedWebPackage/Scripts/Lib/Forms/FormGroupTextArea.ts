import { TextAreaControl } from "../Components/TextAreaControl";
import { TextComponent } from "../Components/TextComponent";
import { EventBuilders } from "../Events";
import { FormGroupTextAreaView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

type Events = { valueChanged: string };

export class FormGroupTextArea extends FormGroup {
    private readonly textAreaControl: TextAreaControl;
    private readonly valueTextComponent: TextComponent;

    readonly when: EventBuilders<Events>;

    constructor(view: FormGroupTextAreaView) {
        super(view);
        this.textAreaControl = this.addComponent(new TextAreaControl(view.textAreaView));
        this.when = this.textAreaControl.when;
        this.setLabelFor(this.textAreaControl);
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

    setFocus(delay = 0) { this.textAreaControl.setFocus(delay); }

    getValue() { return this.textAreaControl.getValue(); }

    setValue(value: string) {
        this.textAreaControl.setValue(value);
    }
}