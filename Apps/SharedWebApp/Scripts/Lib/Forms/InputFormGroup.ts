import { InputControl } from "../Components/InputControl";
import { DefaultEvent } from "../Events";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export abstract class InputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    private readonly input: InputControl<TValue>;

    private readonly _valueChanged = new DefaultEvent<TValue>(this);
    readonly valueChanged = this._valueChanged.handler();

    constructor(
        prefix: string,
        name: string,
        protected readonly view: SimpleFieldFormGroupInputView,
        protected readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(prefix, name, view);
        const valueName = this.getName();
        view.caption.setFor(valueName);
        view.input.setViewID(valueName);
        view.input.setViewName(valueName);
        this.input = new InputControl(view.input, viewValue);
        this.input.when.valueChanged.then(() => this._valueChanged.invoke(this.getValue()));
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value: TValue) {
        this.input.setValue(value);
    }

    setMaxLength(maxLength: number) {
        this.input.setMaxLength(maxLength);
    }

    protect() {
        this.input.protect();
    }

    setFocus() {
        this.input.setFocus();
    }

    blur() { this.input.blur(); }
}