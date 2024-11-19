import { TextComponent } from "../Components/TextComponent";
import { FormGroupTextView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupText extends FormGroup {
    private readonly textValue: TextComponent;
    private _visibleWhen: (textOrFormattable: string | IFormattable) => boolean;

    constructor(view: FormGroupTextView) {
        super(view);
        this.textValue = this.addComponent(new TextComponent(view.valueTextView));
        this.textValue.syncTitleWithText();
    }

    getValue() { return this.textValue.getText(); }

    setValue(textOrFormattable: string | IFormattable) {
        let value: string;
        if (typeof textOrFormattable === "string") {
            value = textOrFormattable;
        }
        else {
            value = textOrFormattable.format();
        }
        this.textValue.setText(value);
        if (this._visibleWhen) {
            if (this._visibleWhen(textOrFormattable)) {
                this.show();
            }
            else {
                this.hide();
            }
        }
    }

    setTitle(title: string) { this.textValue.setTitle(title); }

    visibleWhenNotBlank() {
        this.visibleWhen((textOrFormattable: string | IFormattable) => {
            let value: string;
            if (typeof textOrFormattable === "string") {
                value = textOrFormattable;
            }
            else {
                value = textOrFormattable.format();
            }
            return Boolean(value);
        })
    }

    visibleWhen(isVisible: (textOrFormattable: string | IFormattable) => boolean) {
        this._visibleWhen = isVisible;
    }
}