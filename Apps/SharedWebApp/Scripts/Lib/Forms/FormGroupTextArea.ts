import { TextAreaControl } from "../Components/TextAreaControl";
import { FormGroupTextAreaView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupTextArea extends FormGroup {
    private readonly textAreaControl: TextAreaControl;

    constructor(view: FormGroupTextAreaView) {
        super(view);
        this.textAreaControl = this.addComponent(new TextAreaControl(view.textArea));
    }

    getValue() { return this.textAreaControl.getValue(); }

    setValue(value: string) {
        this.textAreaControl.setValue(value);
    }
}