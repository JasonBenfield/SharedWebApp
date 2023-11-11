import { InputControl } from "../Components/InputControl";
import { FormGroupInputGroupView, FormGroupInputView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class FormGroupInput<TValue> extends FormGroup {
    private readonly inputControl: InputControl<TValue>;

    constructor(view: FormGroupInputView | FormGroupInputGroupView, viewValue: TypedFieldViewValue<string, TValue>) {
        super(view);
        this.inputControl = this.addComponent(new InputControl(view.input, viewValue));
    }

    getValue() { return this.inputControl.getValue(); }

    setValue(value: TValue) {
        this.inputControl.setValue(value);
    }
}