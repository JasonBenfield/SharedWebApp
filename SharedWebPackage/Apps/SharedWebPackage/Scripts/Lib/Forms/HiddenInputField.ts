import { InputControl } from "../Components/InputControl";
import { InputView } from "../Views/InputView";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

export class HiddenInputField<TValue> implements IField {
    private readonly name: string;
    private readonly input: InputControl<TValue>;

    constructor(prefix: string, name: string, view: InputView, viewValue: TypedFieldViewValue<string, TValue>) {
        this.name = prefix ? `${prefix}_${name}` : name;
        this.input = new InputControl(view, viewValue);
    }

    getName() {
        return this.name;
    }

    getCaption() {
        return '';
    }

    getValue() {
        return this.input.getValue();
    }

    setValue(value: TValue) {
        this.input.setValue(value);
    }

    getField(name: string): IField {
        return this.getName() === name ? this : null;
    }

    clearErrors() {
    }

    validate(errors: IErrorList) {
    }

    import(values: Record<string, any>) {
        if (values) {
            const value = values[this.getName()];
            if (value !== undefined) {
                this.setValue(value);
            }
        }
    }

    export(values: Record<string, any>) {
        values[this.getName()] = this.getValue();
    }
}