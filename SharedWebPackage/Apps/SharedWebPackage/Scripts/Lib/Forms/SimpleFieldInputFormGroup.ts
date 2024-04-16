import { InputControl } from "../Components/InputControl";
import { DebouncedAction } from "../DebouncedAction";
import { EventBuilders } from "../Events";
import { SimpleFieldFormGroupInputView } from "../Views/FormGroup";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";

type Events<TValue> = { valueChanged: TValue };

export abstract class SimpleFieldInputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    private readonly inputControl: InputControl<TValue>;

    readonly when: EventBuilders<Events<TValue>>;

    constructor(
        prefix: string,
        name: string,
        protected readonly view: SimpleFieldFormGroupInputView,
        protected readonly viewValue: TypedFieldViewValue<string, TValue>
    ) {
        super(prefix, name, view);
        const valueName = this.getName();
        view.captionLabel.setFor(valueName);
        view.inputView.setViewID(valueName);
        view.inputView.setViewName(valueName);
        this.inputControl = this.addComponent(new InputControl(view.inputView, viewValue));
        this.when = this.inputControl.when;
        this.inputControl.when.valueChanged.then(() => this.debouncedOnValueChanged.execute());
    }

    makeReadOnly(format: (date: TValue) => string) {
        const value = this.getValue();
        this.inputControl.hide();
        this.valueTextComponent.show();
        this.valueTextComponent.setText(format ? format(value) : this.defaultReadOnlyFormat(value));
    }

    private defaultReadOnlyFormat(value: TValue) {
        return value ? value.toString() : '';
    }

    makeEditable() {
        this.inputControl.show();
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

    protected setCustomValidity(errorMessage: string) {
        this.inputControl.setCustomValidity(errorMessage);
    }

    getValue() {
        return this.inputControl.getValue();
    }

    setValue(value: TValue) {
        this.inputControl.setValue(value);
    }

    setMaxLength(maxLength: number) {
        this.inputControl.setMaxLength(maxLength);
    }

    protect() {
        this.inputControl.protect();
    }

    setFocus() {
        this.inputControl.setFocus();
    }

    blur() { this.inputControl.blur(); }
}