import { DefaultEvent } from "../Events";
import { BlockViewModel } from "../Html/BlockViewModel";
import { Input } from "../Html/Input";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export abstract class InputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    constructor(
        prefix: string,
        name: string,
        vm: BlockViewModel,
        private readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(prefix, name, vm);
        let valueName = this.getName();
        this.input.setID(valueName);
        this.input.setName(valueName);
        this.input.changed.register(this.onInputValueChanged.bind(this));
    }

    private readonly _valueChanged = new DefaultEvent<TValue>(this);
    readonly valueChanged = this._valueChanged.handler();

    private onInputValueChanged(viewValue: string) {
        let value = this.viewValue.setValueFromView(viewValue);
        this._valueChanged.invoke(value);
    }

    readonly input = this.inputGroup.insertContent(0, new Input())
        .configure(input => {
            input.addCssName('form-control');
        });

    getValue() {
        return this.viewValue.getValue();
    }

    setValue(value: TValue) {
        this.viewValue.setValue(value);
        let inputValue = this.viewValue.toView();
        this.input.setValue(inputValue);
    }

    setMaxLength(maxLength: number) {
        this.input.setMaxLength(maxLength);
    }

    protect() {
        this.input.setType('password');
    }

    setFocus() { this.input.setFocus(); }

    blur() { this.input.blur(); }
}