import { TextComponent } from "../Components/TextComponent";
import { FormGroupTextView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class TextValueFormGroup extends FormGroup {
    private readonly textValue: TextComponent;
    private value: string;

    constructor(view: FormGroupTextView) {
        super(view);
        this.textValue = this.addComponent(new TextComponent(view.textValue));
        this.textValue.syncTitleWithText();
    }

    getValue() { this.value; }

    setValue(value: string) {
        this.value = value;
        this.textValue.setText(value);
    }
}