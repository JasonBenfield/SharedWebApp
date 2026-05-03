import { Component, ComponentChangeHandler } from "./Component";
import { ChangedProperty, ObservableChanges } from "./ComponentViewModel";
import { areValuesEqual, IEquatable } from "./Equatable";
import { FocusableComponentChangeHandler, FocusableComponentMixin, HasFocusProperty, IFocusableComponent } from "./FocusableComponent";
import { BaseInputComponentView, BaseInputComponentViewModel, IInputComponent, InputComponentChangeHandler, InputComponentMixin, InputComponentViewModel, InputTextValue, ITextInputComponent, TextInputComponentChangeHandler, TextInputComponentMixin } from "./InputComponent";
import { IUniqueComponent, UniqueComponentChangeHandler, UniqueComponentMixin } from "./UniqueComponent";

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

export interface ITransformedInputComponentViewModel<TValue> {
    get transformedValue(): TransformedInputValue<TValue>;
    set transformedValue(value: TransformedInputValue<TValue>);
}

export type BaseTransformedInputComponentViewModel<TValue> = BaseInputComponentViewModel & ITransformedInputComponentViewModel<TValue>;

export class TransformedInputComponentViewModel<TValue> extends InputComponentViewModel {
    constructor(initialValue: TValue) {
        super();
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

export class TransformedInputValueChangeHandler<TValue> extends ComponentChangeHandler<BaseTransformedInputComponentViewModel<TValue>, BaseInputComponentView> {
    constructor(
        viewModel: BaseTransformedInputComponentViewModel<TValue>,
        view: BaseInputComponentView,
        private readonly transformedInput: ITransformedInput<TValue>
    ) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseTransformedInputComponentViewModel<TValue>>) {
        if (changes.textValue) {
            const textValue = changes.textValue.value;
            if (textValue.isFromUI) {
                const value = this.transformedInput.fromView(textValue.value);
                this.viewModel.transformedValue = new TransformedInputValue(value, true);
            }
            else {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
        const changedTransformedValue = (<any>changes).transformedValue as ChangedProperty<TransformedInputValue<TValue>>;
        if (changedTransformedValue) {
            const transformedValue = changedTransformedValue.value;
            if (!transformedValue.isFromUI || !this.viewModel.hasFocus.value) {
                const textValue = this.transformedInput.toView(transformedValue.value);
                this.viewModel.textValue = new InputTextValue(textValue, false);
            }
        }
        if (changes.hasFocus) {
            const hasFocus = changes.hasFocus.value;
            if (!hasFocus.value) {
                const value = this.transformedInput.fromView(this.viewModel.textValue.value);
                const textValue = this.transformedInput.toView(value);
                this.viewModel.textValue = new InputTextValue(textValue);
            }
        }
    }
}

type TransformedInputComponentEventLayout<TValue> = {
    valueChanged: TValue
};

export class TransformedInputComponent<TValue>
    extends InputComponentMixin(TextInputComponentMixin(UniqueComponentMixin(FocusableComponentMixin(Component))))
    implements IInputComponent, ITextInputComponent, IUniqueComponent, IFocusableComponent {

    constructor(
        protected readonly viewModel: BaseTransformedInputComponentViewModel<TValue>,
        protected readonly view: BaseInputComponentView,
        protected readonly transformedInput: ITransformedInput<TValue>
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new FocusableComponentChangeHandler(viewModel, view),
            new TransformedInputValueChangeHandler(viewModel, view, transformedInput),
            new TextInputComponentChangeHandler(viewModel, view),
            new InputComponentChangeHandler(viewModel, view)
        );
        view.when.textValueInput.then(this.onTextValueChangedFromUI.bind(this));
        view.when.focused.then(this.onFocusFromUI.bind(this));
        view.when.blurred.then(this.onBlurFromUI.bind(this));
    }

    private readonly events = this.eventManager.addEvents<TransformedInputComponentEventLayout<TValue>>({
        valueChanged: null
    });
    readonly when = this.events.when;

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

    protected handleChanges(changes: ObservableChanges<BaseTransformedInputComponentViewModel<TValue>>) {
        super.handleChanges(changes);
        if (changes.transformedValue) {
            const value = changes.transformedValue.value;
            this.events?.events.valueChanged.invoke(value.value);
        }
    }

    get value() { return this.viewModel.transformedValue.value; }
    set value(value: TValue) {
        this.viewModel.transformedValue = new TransformedInputValue(value, false);
    }

}