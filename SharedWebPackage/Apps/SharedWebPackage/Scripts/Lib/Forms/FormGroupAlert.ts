import { TextComponent } from "../Components/TextComponent";
import { ContextualClass } from "../ContextualClass";
import { FormGroupAlertView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupAlert extends FormGroup {
    private readonly messageTextComponent: TextComponent;

    constructor(protected readonly view: FormGroupAlertView) {
        super(view);
        this.messageTextComponent = this.addComponent(new TextComponent(view.messageTextView));
    }

    setContext(context: ContextualClass) {
        this.view.alert.setContext(context);
    }

    getValue() { return this.messageTextComponent.getText(); }

    setValue(value: string) {
        this.messageTextComponent.setText(value);
    }
}