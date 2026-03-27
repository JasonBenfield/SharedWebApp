import { FormattedNumber } from "../FormattedNumber";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { areValuesEqual, IEquatable } from "./Equatable";
import { EventManager } from "./EventManager";
import { FocusableComponentChangeHandler, FocusableComponentMixin, HasFocusProperty } from "./FocusableComponent";
import { InputComponentView, InputComponentViewModel, InputTextValue } from "./InputComponent";
import { UniqueComponentChangeHandler, UniqueComponentMixin } from "./UniqueComponent";

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

export class TransformedNumberInput implements ITransformedInput<number> {
    private _textValueWhenZero = "";
    private _formatString = "";
    private _valueWhenNaN = 0;
    private _numberOfDecimals = -1;

    setNumberOfDecimals(numberOfDecimals: number) {
        this._numberOfDecimals = numberOfDecimals;
        return this;
    }

    fromView(textValue: string) {
        let value: number;
        if (textValue === this._textValueWhenZero) {
            value = 0;
        }
        else {
            value = Number.parseFloat(textValue.replace(/[A-Z,|$]+/ig, ""));
            if (Number.isNaN(value)) {
                value = this._valueWhenNaN;
            }
            else if (this._numberOfDecimals > -1) {
                const powerOfTen = Math.pow(10, this._numberOfDecimals);
                value = Math.round((value + Number.EPSILON) * powerOfTen) / powerOfTen;
            }
        }
        return value;
    }

    setTextValueWhenZero(textValue: string) {
        this._textValueWhenZero = textValue;
        return this;
    }

    setFormatString(formatString: string) {
        this._formatString = formatString;
        return this;
    }

    toView(value: number) {
        let textValue: string;
        if (value === 0) {
            textValue = this._textValueWhenZero;
        }
        else if (this._formatString) {
            textValue = new FormattedNumber(value, this._formatString).format();
        }
        else {
            textValue = value.toLocaleString();
        }
        return textValue;
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

    handleChanges(changes: ObservableChanges<TransformedInputComponentViewModel<TValue>>) {
        if (changes.transformedValue) {
            const transformedValue: TransformedInputValue<TValue> = changes.transformedValue.value;
            const textValue = this.transformedInput.toView(transformedValue.value);
            this.viewModel.textValue = new InputTextValue(
                textValue,
                transformedValue.isFromUI ? this.viewModel.hasFocus.value : false
            );
        }
        if (changes.textValue) {
            const textValue: InputTextValue = changes.textValue.value;
            if (textValue.isFromUI) {
                const value = this.transformedInput.fromView(textValue.value);
                this.viewModel.transformedValue = new TransformedInputValue(value, true);
            }
            else {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
        if (changes.hasFocus) {
            const hasFocus: HasFocusProperty = changes.hasFocus.value;
            if (!hasFocus.value) {
                const value = this.transformedInput.fromView(this.viewModel.textValue.value);
                const textValue = this.transformedInput.toView(value);
                this.viewModel.textValue = new InputTextValue(textValue);
            }
        }
        if (changes.placeholder) {
            const placeholder: string = changes.placeholder.value;
            this.updateView(v => v.setPlaceholder(placeholder));
        }
    }
}

type TransformedInputComponentEventLayout<TValue> = {
    valueChanged: TValue
};

export class TransformedInputComponent<TValue> extends UniqueComponentMixin(FocusableComponentMixin(Component)) {
    private readonly events = this.eventManager.addEvents<TransformedInputComponentEventLayout<TValue>>({
        valueChanged: null
    });
    readonly when = this.events.when;

    constructor(
        protected readonly viewModel: TransformedInputComponentViewModel<TValue>,
        protected readonly view: InputComponentView,
        protected readonly transformedInput: ITransformedInput<TValue>
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new FocusableComponentChangeHandler(viewModel, view),
            new TransformedInputComponentChangeHandler(viewModel, view, transformedInput)
        );
        view.when.textValueInput.then(this.onTextValueChangedFromUI.bind(this));
        view.when.focused.then(this.onFocusFromUI.bind(this));
        view.when.blurred.then(this.onBlurFromUI.bind(this));
    }

    private onTextValueChangedFromUI() {
        const textValue = this.view.getTextValue();
        if (this.view.elementExists) {
            this.viewModel.textValue = new InputTextValue(textValue, true);
        }
    }

    private onFocusFromUI() {
        this.viewModel.hasFocus = new HasFocusProperty(true, true);
    }

    private onBlurFromUI() {
        this.viewModel.hasFocus = new HasFocusProperty(false, true);
    }

    protected handleChanges(changes: ObservableChanges<TransformedInputComponentViewModel<TValue>>) {
        super.handleChanges(changes);
        if (changes.transformedValue) {
            const value: TransformedInputValue<TValue> = changes.transformedValue.value;
            this.events?.events.valueChanged.invoke(value.value);
        }
    }

    get value() { return this.viewModel.transformedValue.value; }
    set value(value: TValue) {
        this.viewModel.transformedValue = new TransformedInputValue(value, false);
    }

    get placeholder() { return this.viewModel.placeholder; }
    set placeholder(placeholder: string) { this.viewModel.placeholder = placeholder; }

}