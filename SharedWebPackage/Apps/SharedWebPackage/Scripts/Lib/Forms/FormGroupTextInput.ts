import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroupInput } from "./FormGroupInput";
import { TextToTextViewValue } from "./TextToTextViewValue";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class FormGroupTextInput extends FormGroupInput<string> {
    constructor(view: FormGroupInputView | FormGroupInputGroupView, viewValue: TypedFieldViewValue<string, string> = new TextToTextViewValue()) {
        super(view, viewValue);
    }
}