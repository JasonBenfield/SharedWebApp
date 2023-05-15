import { InputControl } from "../Components/InputControl";
import { DefaultEvent } from "../Events";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export abstract class InputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: SimpleFieldFormGroupInputView;
    private readonly input: InputControl<TValue>;

    private readonly _valueChanged = new DefaultEvent<TValue>(this);
    readonly valueChanged = this._valueChanged.handler();

    constructor(
        prefix: string,
        name: string,
        view: SimpleFieldFormGroupInputView,
        protected readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(prefix, name, view);
        const valueName = this.getName();
        this.view.caption.setFor(valueName);
        this.view.input.setViewID(valueName);
        this.view.input.setViewName(valueName);
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
        this.view.input.setMaxLength(maxLength);
    }

    protect() {
        this.view.input.setType('password');
    }

    setFocus() { this.view.input.setFocus(); }

    blur() { this.view.input.blur(); }
}