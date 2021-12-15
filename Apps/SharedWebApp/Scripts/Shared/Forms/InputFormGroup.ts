import { DebouncedAction } from "../DebouncedAction";
import { DefaultEvent } from "../Events";
import { InputFormGroupView } from "./InputFormGroupView";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export abstract class InputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: InputFormGroupView;

    private readonly _valueChanged = new DefaultEvent<TValue>(this);
    readonly valueChanged = this._valueChanged.handler();

    constructor(
        prefix: string,
        name: string,
        view: InputFormGroupView,
        private readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(prefix, name, view);
        let valueName = this.getName();
        this.view.input.setID(valueName);
        this.view.input.setName(valueName);
        this.view.input.changed.register(this.onInputValueChanged.bind(this));
    }

    private onInputValueChanged(viewValue: string) {
        let value = this.viewValue.setValueFromView(viewValue);
        this._valueChanged.invoke(value);
        this.debouncedOnInputValueChanged.execute();
    }

    private debouncedOnInputValueChanged = new DebouncedAction(
        () => {
            if (!this.view.input.hasFocus()) {
                let currentValue = this.view.input.getValue();
                let newValue = this.viewValue.toView();
                if (newValue !== currentValue) {
                    this.view.input.setValue(newValue);
                }
            }
        },
        700
    );

    getValue() {
        return this.viewValue.getValue();
    }

    setValue(value: TValue) {
        this.viewValue.setValue(value);
        let inputValue = this.viewValue.toView();
        this.view.input.setValue(inputValue);
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