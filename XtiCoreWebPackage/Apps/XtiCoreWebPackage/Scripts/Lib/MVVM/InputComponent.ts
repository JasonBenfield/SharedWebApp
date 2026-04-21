import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { IEquatable } from "./Equatable";
import { CustomEventRegistrations } from "./EventManager";
import { FocusableComponentChangeHandler, FocusableComponentMixin, FocusableViewMixin, FocusableViewModelMixin, HasFocusProperty, IFocusableView, IFocusableViewModel } from "./FocusableComponent";
import { StyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";
import { IUniqueView, IUniqueViewModel, UniqueComponentChangeHandler, UniqueComponentMixin, UniqueViewMixin, UniqueViewModelMixin } from "./UniqueComponent";

export class InputTextValue implements IEquatable {
    constructor(readonly value: string, readonly isFromUI = false) {
    }

    equals(other: InputTextValue) {
        let result: boolean;
        if (other) {
            result = this.value === other.value && this.isFromUI === other.isFromUI;
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

export interface ITextInputViewModel {
    get textValue(): InputTextValue;
    set textValue(textValue: InputTextValue);

    get placeholder(): string;
    set placeholder(placeholder: string);

    get maxLength(): number;
    set maxLength(maxLength: number);

    get isRequired(): boolean;
    set isRequired(isRequired: boolean);

    get isDisabled(): boolean;
    set isDisabled(isDisabled: boolean);

    get isReadOnly(): boolean;
    set isReadOnly(isReadOnly: boolean);
}

export function TextInputViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ITextInputViewModel {
        private _textValue = new InputTextValue("");
        get textValue() { return this._textValue; }
        set textValue(textValue: InputTextValue) { this._textValue = textValue; }

        private _isRequired = false;
        get isRequired() { return this._isRequired; }
        set isRequired(isRequired: boolean) { this._isRequired = isRequired; }

        private _maxLength = 0;
        get maxLength() { return this._maxLength; }
        set maxLength(maxLength: number) { this._maxLength = maxLength; }

        private _isDisabled = false;
        get isDisabled() { return this._isDisabled; }
        set isDisabled(isDisabled: boolean) { this._isDisabled = isDisabled; }

        private _isReadOnly = false;
        get isReadOnly() { return this._isReadOnly; }
        set isReadOnly(isReadOnly: boolean) { this._isReadOnly = isReadOnly; }

        private _placeholder = "";
        get placeholder() { return this._placeholder; }
        set placeholder(placeholder: string) { this._placeholder = placeholder; }
    };
}

export interface IInputComponentViewModel {
    get inputType(): string;
    set inputType(inputType: string);
}

export class InputComponentViewModel
    extends TextInputViewModelMixin(UniqueViewModelMixin(FocusableViewModelMixin(ComponentViewModel)))
    implements ITextInputViewModel, IInputComponentViewModel {

    private _inputType = "";
    get inputType() { return this._inputType; }
    set inputType(inputType: string) { this._inputType = inputType; }
}

export type BaseTextInputComponentViewModel = ComponentViewModel & ITextInputViewModel;

export type BaseInputComponentViewModel = BaseTextInputComponentViewModel & IInputComponentViewModel & IUniqueViewModel & IFocusableViewModel;

type InputViewEventLayout = {
    textValueInput: InputEvent;
    focused: FocusEvent;
    blurred: FocusEvent;
}

export interface ITextInputView {
    getTextValue(): string;
    setTextValue(textValue: string): void;
    setPlaceholder(placeholder: string): void;
    setMaxLength(maxLength: number): void;
    required(): void;
    notRequired(): void;
    enable(): void;
    disable(): void;
    makeReadOnly(): void;
    makeEditable(): void;
}

export interface IInputView {
    readonly when: CustomEventRegistrations<InputViewEventLayout>;
    setType(type: string): void;
}

export type BaseTextInputComponentView = ComponentView & IFocusableView & IUniqueView & ITextInputView;

export type BaseInputComponentView = ComponentView & IFocusableView & IUniqueView & ITextInputView & IInputView;

export function TextInputComponentViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base implements ITextInputView {
        private textValue = "";
        private get textInputElement() { return this.element as HTMLInputElement | HTMLTextAreaElement | null; }

        getTextValue() {
            const element = this.textInputElement;
            return element ? element.value : "";
        }

        protected addToDom(index: number) {
            super.addToDom(index);
            this.setInputValue();
        }

        setTextValue(textValue: string) {
            this.textValue = textValue;
            this.setInputValue();
        }

        private setInputValue() {
            const element = this.textInputElement;
            if (element) {
                element.value = this.textValue;
            }
        }

        setPlaceholder(placeholder: string) {
            return this.setAttribute("placeholder", placeholder);
        }

        setMaxLength(maxLength: number) {
            return this.setAttribute("maxlength", maxLength.toString());
        }

        required() { return this.setAttribute("required", ""); }

        notRequired() { return this.removeAttribute("required"); }

        enable() { return this.removeAttribute("disabled"); }

        disable() { return this.setAttribute("disabled", ""); }

        makeReadOnly() { return this.setAttribute("readOnly", ""); }

        makeEditable() { return this.removeAttribute("readOnly"); }
    };
}

export class InputComponentView
    extends TextInputComponentViewMixin(FocusableViewMixin(UniqueViewMixin(StyleableComponentViewMixin(ComponentView))))
    implements ITextInputView, IInputView {

    constructor() {
        super("input");
        this.setType("text");
        this.setEventListener(
            "input",
            this.handleInputEvent.bind(this) as any
        );
        this.setEventListener(
            "focus",
            this.handleFocusEvent.bind(this) as any
        );
        this.setEventListener(
            "blur",
            this.handleBlurEvent.bind(this) as any
        );
    }

    private readonly events = this.eventManager.addEvents<InputViewEventLayout>({
        textValueInput: null,
        focused: null,
        blurred: null
    });
    readonly when = this.events.when;

    private get inputElement() { return this.element as HTMLInputElement | null; }

    setType(type: string) {
        this.setAttribute("type", type);
    }

    private handleInputEvent(evt: InputEvent) {
        this.events.events.textValueInput.invoke(evt);
    }

    private handleFocusEvent(evt: FocusEvent) {
        this.events.events.focused.invoke(evt);
    }

    private handleBlurEvent(evt: FocusEvent) {
        this.events.events.blurred.invoke(evt);
    }

    simulateInputEvent(textValue: string) {
        const element = this.inputElement;
        if (element) {
            element.value = textValue;
            element.dispatchEvent(
                new Event("input", {
                    bubbles: true,
                    cancelable: true
                })
            );
        }
    }

    simulateFocusEvent() {
        this.setFocus();
        const element = this.inputElement;
        if (element) {
            element.dispatchEvent(
                new Event("focus", {
                    bubbles: true,
                    cancelable: true
                })
            );
        }
    }

    simulateBlurEvent() {
        this.blur();
        const element = this.inputElement;
        if (element) {
            element.dispatchEvent(
                new Event("blur", {
                    bubbles: true,
                    cancelable: true
                })
            );
        }
    }
}

export class ContainerOfInputView<
    TLayout extends ComponentViewLayout<TLayout>
> extends BaseCompositeComponentView<TLayout, BaseInputComponentView> implements ITextInputView, IInputView {

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseInputComponentView) {
        return new ContainerOfInputView("div", layout, toPublicLayout).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseInputComponentView) {
        return new ContainerOfInputView("span", layout, toPublicLayout).asLayout();
    }

    static listItem<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseInputComponentView) {
        return new ContainerOfInputView("li", layout, toPublicLayout).asLayout();
    }

    readonly when = this.publicLayout.when;

    declare asLayout: () => ContainerOfInputView<TLayout> & TLayout;

    getTextValue() { return this.publicLayout.getTextValue(); }

    setTextValue(textValue: string) { this.publicLayout.setTextValue(textValue); }

    setPlaceholder(placeholder: string) { this.publicLayout.setPlaceholder(placeholder); }

    setMaxLength(maxLength: number) { this.publicLayout.setMaxLength(maxLength); }

    required() { this.publicLayout.required(); }

    notRequired() { this.publicLayout.notRequired(); }

    enable() { this.publicLayout.enable(); }

    disable() { this.publicLayout.disable(); }

    makeReadOnly() { this.publicLayout.makeReadOnly(); }

    makeEditable() { this.publicLayout.makeEditable(); }

    setType(type: string) { this.publicLayout.setType(type); }
}

export class TextInputValueChangeHandler extends ComponentChangeHandler<BaseTextInputComponentViewModel, BaseTextInputComponentView> {
    constructor(viewModel: BaseTextInputComponentViewModel, view: BaseTextInputComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseTextInputComponentViewModel>) {
        if (changes.textValue) {
            const textValue = changes.textValue.value;
            if (!textValue.isFromUI) {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
    }
}

export class TextInputComponentChangeHandler extends ComponentChangeHandler<BaseTextInputComponentViewModel, BaseTextInputComponentView> {
    constructor(viewModel: BaseTextInputComponentViewModel, view: BaseTextInputComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseTextInputComponentViewModel>) {
        if (changes.placeholder) {
            const placeholder = changes.placeholder.value;
            this.updateView(v => v.setPlaceholder(placeholder));
        }
        if (changes.isRequired) {
            const isRequired = changes.isRequired.value;
            this.updateView(v => {
                if (isRequired) {
                    v.required();
                }
                else {
                    v.notRequired();
                }
            });
        }
        if (changes.maxLength) {
            const maxLength = changes.maxLength.value;
            this.updateView(v => v.setMaxLength(maxLength));
        }
    }
}

export class InputComponentChangeHandler extends ComponentChangeHandler<BaseInputComponentViewModel, BaseInputComponentView> {
    constructor(viewModel: BaseInputComponentViewModel, view: BaseInputComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseInputComponentViewModel>) {
        if (changes.inputType) {
            const inputType = changes.inputType.value;
            this.updateView(v => v.setType(inputType));
        }
    }
}

type InputComponentEventLayout = {
    textValueChanged: string
};

export function TextInputValueComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: BaseTextInputComponentViewModel;

        get textValue() { return this.viewModel.textValue.value; }
        set textValue(textValue: string) { this.viewModel.textValue = new InputTextValue(textValue, false); }
    }
}

export function TextInputComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: BaseTextInputComponentViewModel;

        get placeholder() { return this.viewModel.placeholder; }
        set placeholder(placeholder: string) { this.viewModel.placeholder = placeholder; }

        get maxLength() { return this.viewModel.maxLength; }
        set maxLength(maxLength: number) { this.viewModel.maxLength = maxLength; }

        required() { this.viewModel.isRequired = true; }

        notRequired() { this.viewModel.isRequired = false; }

    }
}

export function InputComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: BaseInputComponentViewModel;

        hideInput() {
            this.viewModel.inputType = "hidden";
        }

        obscureInput() {
            this.viewModel.inputType = "password";
        }
    }
}

export class InputComponent
    extends InputComponentMixin(TextInputValueComponentMixin(TextInputComponentMixin(UniqueComponentMixin(FocusableComponentMixin(Component))))) {

    private readonly events = this.eventManager.addEvents<InputComponentEventLayout>({
        textValueChanged: null
    });
    readonly when = this.events.when;

    constructor(
        protected readonly viewModel: BaseInputComponentViewModel,
        protected readonly view: BaseInputComponentView
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new FocusableComponentChangeHandler(viewModel, view),
            new TextInputValueChangeHandler(viewModel, view),
            new TextInputComponentChangeHandler(viewModel, view),
            new InputComponentChangeHandler(viewModel, view)
        );
        viewModel.inputType = "text";
        view.when.textValueInput.then(this.onTextValueChangedFromUI.bind(this));
        view.when.focused.then(this.onFocusFromUI.bind(this));
        view.when.blurred.then(this.onBlurFromUI.bind(this));
    }

    protected handleChanges(changes: ObservableChanges<BaseInputComponentViewModel>) {
        super.handleChanges(changes);
        if (changes.textValue) {
            const textValue: InputTextValue = changes.textValue.value;
            this.events?.events.textValueChanged.invoke(textValue.value);
        }
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
}