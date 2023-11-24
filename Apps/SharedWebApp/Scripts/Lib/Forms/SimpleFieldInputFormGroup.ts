import { InputControl } from "../Components/InputControl";
import { DebouncedAction } from "../DebouncedAction";
import { EventBuilders } from "../Events";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

type Events<TValue> = { valueChanged: TValue };

export abstract class SimpleFieldInputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    private readonly input: InputControl<TValue>;

    readonly when: EventBuilders<Events<TValue>>;

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
        this.input = this.addComponent(new InputControl(view.input, viewValue));
        this.when = this.input.when;
        this.input.when.valueChanged.then(() => this.debouncedOnValueChanged.execute());
    }

    makeReadOnly(format: (date: TValue) => string) {
        const value = this.getValue();
        this.input.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format ? format(value) : this.defaultReadOnlyFormat(value));
    }

    private defaultReadOnlyFormat(value: TValue) {
        return value ? value.toString() : '';
    }

    makeEditable() {
        this.input.show();
        this.valueTextComponent.hide();
    }

    private debouncedOnValueChanged = new DebouncedAction(
        this.onValueChanged.bind(this),
        700
    );

    private onValueChanged() {
        if (this.hasValidated) {
            this.validate(new ErrorList());
        }
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