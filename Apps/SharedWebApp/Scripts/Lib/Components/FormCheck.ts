import { EventBuilders } from "../Events";
import { FormCheckView } from "../Views/FormCheckView";
import { BasicComponent } from "./BasicComponent";
import { BooleanInputControl, BooleanInputControlEvents } from "./BooleanInputControl";
import { TextComponent } from "./TextComponent";

export class FormCheck extends BasicComponent {
    protected readonly view: FormCheckView;
    readonly booleanInput: BooleanInputControl;
    readonly labelText: TextComponent;

    readonly when: EventBuilders<BooleanInputControlEvents>;

    constructor(view: FormCheckView) {
        super(view);
        this.booleanInput = this.addComponent(new BooleanInputControl(view.input));
        this.when = this.booleanInput.when;
        this.labelText = this.addComponent(new TextComponent(view.labelText));
    }

    getValue() { return this.booleanInput.getValue(); }

    setValue(value: boolean) { this.booleanInput.setValue(value); }

    setText(text: string) {
        this.labelText.setText(text);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}