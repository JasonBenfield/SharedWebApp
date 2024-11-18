import { TextComponent } from "../Components/TextComponent";
import { ContextualClass } from "../ContextualClass";
import { FormGroupAlertView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupAlert extends FormGroup {
    private readonly messageTextComponent: TextComponent;
    private context: ContextualClass = ContextualClass.default;
    private isAlertVisibleWhenBlank = false;

    constructor(protected readonly view: FormGroupAlertView) {
        super(view);
        this.messageTextComponent = this.addComponent(new TextComponent(view.messageTextView));
    }

    showAlertWhenBlank() {
        this.isAlertVisibleWhenBlank = true;
        this.updateAlertVisibility();
    }

    hideAlertWhenBlank() {
        this.isAlertVisibleWhenBlank = false;
        this.updateAlertVisibility();
    }

    success(message: string) {
        this.setText(message, ContextualClass.success);
    }

    info(message: string) {
        this.setText(message, ContextualClass.info);
    }

    warning(message: string) {
        this.setText(message, ContextualClass.warning);
    }

    danger(message: string) {
        this.setText(message, ContextualClass.danger);
    }

    dark(message: string) {
        this.setText(message, ContextualClass.dark);
    }

    light(message: string) {
        this.setText(message, ContextualClass.light);
    }

    primary(message: string) {
        this.setText(message, ContextualClass.primary);
    }

    secondary(message: string) {
        this.setText(message, ContextualClass.secondary);
    }

    setContext(context: ContextualClass) {
        this.context = context;
        this.view.alertView.setContext(context);
    }

    getValue() { return this.messageTextComponent.getText(); }

    setValue(value: string) {
        this.setText(value, this.context);
    }

    private setText(message: string, context: ContextualClass) {
        this.context = context;
        this.messageTextComponent.setText(message);
        this.view.alertView.setContext(context);
        this.updateAlertVisibility();
    }

    private updateAlertVisibility() {
        if (this.getValue() || this.isAlertVisibleWhenBlank) {
            this.view.alertView.show();
        }
        else {
            this.view.alertView.hide();
        }
    }
}