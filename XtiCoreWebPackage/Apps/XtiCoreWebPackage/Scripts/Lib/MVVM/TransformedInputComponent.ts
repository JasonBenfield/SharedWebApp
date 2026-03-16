import { Component, ComponentChangeHandler } from "./Component";
import { ChangedProperty, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { areValuesEqual, IEquatable } from "./Equatable";
import { FocusableComponentMixin, HasFocusProperty } from "./FocusableComponent";
import { InputComponentChangeHandler, InputComponentView, InputComponentViewModel, InputTextValue } from "./InputComponent";

export class TransformedInputValue<TValue> implements IEquatable {
    constructor(readonly value: TValue, readonly isFromUI = false) {
    }

    equals(other: InputTextValue) {
        let result: boolean;
        if (other) {
            result = areValuesEqual(this.value, other.value) && this.isFromUI === other.isFromUI;
        }
        else {
            result = false;
        }
        return result;
    }

    toString() {
        return `value: '${this.value}', isFromUI: ${this.isFromUI}`;
    }
}

export class TransformedInputComponentViewModel<TValue> extends InputComponentViewModel {
    constructor(
        initialValue: TValue,
        initializer: Omit<ComponentViewModelInitializer<TransformedInputComponentViewModel<TValue>>, "value"> = {}
    ) {
        super("", initializer);
        this.transformedValue = new TransformedInputValue(initialValue);
    }

    private _transformedValue: TransformedInputValue<TValue> | null = null;
    get transformedValue() { return this._transformedValue!; }
    set transformedValue(value: TransformedInputValue<TValue>) { this._transformedValue = value; }
}

export interface ITransformedInput<TValue> {
    fromView(textValue: string): TValue;
    toView(value: TValue): string;
}

export class TransformedInputBuilder<TValue> {
    static fromView<TValue>(fromView: (textValue: string) => TValue) {
        return new TransformedInputBuilder(fromView);
    }

    private constructor(private readonly fromView: (textValue: string) => TValue) {
    }

    toView(transform: (value: TValue) => string) {
        const transformedInput: ITransformedInput<TValue> = {
            fromView: this.fromView,
            toView: transform
        };
        return transformedInput;
    }
}

export class TransformedInputComponentChangeHandler<TValue> extends ComponentChangeHandler<TransformedInputComponentViewModel<TValue>, InputComponentView> {
    constructor(
        viewModel: TransformedInputComponentViewModel<TValue>,
        view: InputComponentView,
        private readonly transformedInput: ITransformedInput<TValue>
    ) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<TransformedInputComponentViewModel<TValue>> & { value: ChangedProperty }) {
        if (changes.transformedValue) {
            const transformedValue: TransformedInputValue<TValue> = changes.transformedValue.value;
            const textValue = this.transformedInput.toView(transformedValue.value);
            this.viewModel.textValue = new InputTextValue(textValue, transformedValue.isFromUI);
        }
        if (changes.textValue) {
            const textValue: InputTextValue = changes.textValue.value;
            if (textValue.isFromUI) {
                const value = this.transformedInput.fromView(textValue.value);
                this.viewModel.transformedValue = new TransformedInputValue(value, true);
            }
            if (!textValue.isFromUI || !this.viewModel.hasFocus.value) {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
        if (changes.hasFocus) {
            const hasFocus: HasFocusProperty = changes.hasFocus.value;
            if (!hasFocus.value) {
                this.updateView(v => v.setTextValue(this.viewModel.textValue.value));
            }
        }
    }
}

export class TransformedInputComponent<TValue> extends FocusableComponentMixin(Component) {
    constructor(
        protected readonly viewModel: TransformedInputComponentViewModel<TValue>,
        protected readonly view: InputComponentView,
        protected readonly transformedInput: ITransformedInput<TValue>
    ) {
        super(
            viewModel,
            view,
            new InputComponentChangeHandler(viewModel, view),
            new TransformedInputComponentChangeHandler(viewModel, view, transformedInput)
        );
        view.when.textValueInput.then(this.onTextValueChanged.bind(this));
        view.when.focused.then(this.onFocus.bind(this));
        view.when.blurred.then(this.onBlur.bind(this));
    }

    private onTextValueChanged() {
        const textValue = this.view.getTextValue();
        if (this.view.elementExists) {
            this.viewModel.textValue = new InputTextValue(textValue, true);
        }
    }

    private onFocus() {
        this.viewModel.hasFocus = new HasFocusProperty(true, true);
    }

    private onBlur() {
        this.viewModel.hasFocus = new HasFocusProperty(false, true);
    }

    get value() { return this.viewModel.transformedValue.value; }
    set value(value: TValue) {
        this.viewModel.transformedValue = new TransformedInputValue(value, false);
    }

    get placeholder() { return this.viewModel.placeholder; }
    set placeholder(placeholder: string) { this.viewModel.placeholder = placeholder; }
}