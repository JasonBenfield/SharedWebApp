import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { IEquatable } from "./Equatable";
import { CustomEventRegistrations } from "./EventManager";
import { FocusableComponentChangeHandler, FocusableComponentMixin, FocusableViewMixin, FocusableViewModelMixin, HasFocusProperty, IFocusableView } from "./FocusableComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { IUniqueView, UniqueComponentChangeHandler, UniqueComponentMixin, UniqueViewModelMixin } from "./UniqueComponent";

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

export class InputComponentViewModel extends UniqueViewModelMixin(FocusableViewModelMixin(ComponentViewModel)) {
    constructor(initialTextValue: string = "", initializer: Omit<ComponentViewModelInitializer<InputComponentViewModel>, "textValue"> = {}) {
        super(initializer);
        this.textValue = new InputTextValue(initialTextValue);
    }

    private _textValue = new InputTextValue("");
    get textValue() { return this._textValue; }
    set textValue(textValue: InputTextValue) { this._textValue = textValue; }

    private _placeholder = "";
    get placeholder() { return this._placeholder; }
    set placeholder(placeholder: string) { this._placeholder = placeholder; }

    private _isRequired = false;
    get isRequired() { return this._isRequired; }
    set isRequired(isRequired: boolean) { this._isRequired = isRequired; }

    private _maxLength = 0;
    get maxLength() { return this._maxLength; }
    set maxLength(maxLength: number) { this._maxLength = maxLength; }
}

type InputViewEventLayout = {
    textValueInput: InputEvent;
    focused: FocusEvent;
    blurred: FocusEvent;
}

export interface IInputView {
    readonly when: CustomEventRegistrations<InputViewEventLayout>;
    getTextValue(): string;
    setTextValue(textValue: string): void;
    setPlaceholder(placeholder: string): this;
    setMaxLength(maxLength: number): this;
    required(): this;
    notRequired(): this;
}

export type BaseInputComponentView = ComponentView & IFocusableView & IUniqueView & IInputView;

export class InputComponentView extends FocusableViewMixin(StyleableComponentViewMixin(ComponentView)) implements IInputView {
    private readonly events = this.eventManager.addEvents<InputViewEventLayout>({
        textValueInput: null,
        focused: null,
        blurred: null
    });
    private hasRegisteredEvents = false;

    constructor() {
        super("input");
        this.setType("text");
    }

    private get inputElement() { return this.element as HTMLInputElement | null; }

    setType(type: string) {
        this.setAttribute("type", type);
    }

    getTextValue() {
        const element = this.inputElement;
        return element ? element.value : "";
    }

    protected addToDom(index: number) {
        super.addToDom(index);
        this.setInputValue();
    }

    private textValue = "";

    setTextValue(textValue: string) {
        this.textValue = textValue;
        this.setInputValue();
    }

    private setInputValue() {
        const element = this.inputElement;
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

    notRequired() { return this.setAttribute("required", null); }

    get when() {
        if (!this.hasRegisteredEvents) {
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
            this.hasRegisteredEvents = true;
        }
        return this.events.when;
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

export class InputComponentChangeHandler extends ComponentChangeHandler<InputComponentViewModel, BaseInputComponentView> {
    constructor(viewModel: InputComponentViewModel, view: BaseInputComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<InputComponentViewModel>) {
        if (changes.textValue) {
            const textValue = changes.textValue.value;
            if (!textValue.isFromUI) {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
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

type InputComponentEventLayout = {
    textValueChanged: string
};

export class InputComponent extends UniqueComponentMixin(FocusableComponentMixin(Component)) {
    private readonly events = this.eventManager.addEvents<InputComponentEventLayout>({
        textValueChanged: null
    });
    readonly when = this.events.when;

    constructor(
        protected readonly viewModel: InputComponentViewModel,
        protected readonly view: BaseInputComponentView
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new FocusableComponentChangeHandler(viewModel, view),
            new InputComponentChangeHandler(viewModel, view)
        );
        view.when.textValueInput.then(this.onTextValueChangedFromUI.bind(this));
        view.when.focused.then(this.onFocusFromUI.bind(this));
        view.when.blurred.then(this.onBlurFromUI.bind(this));
    }

    protected handleChanges(changes: ObservableChanges<InputComponentViewModel>) {
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

    get textValue() { return this.viewModel.textValue.value; }
    set textValue(textValue: string) { this.viewModel.textValue = new InputTextValue(textValue, false); }

    get placeholder() { return this.viewModel.placeholder; }
    set placeholder(placeholder: string) { this.viewModel.placeholder = placeholder; }

    get maxLength() { return this.viewModel.maxLength; }
    set maxLength(maxLength: number) { this.viewModel.maxLength = maxLength; }

    required() { this.viewModel.isRequired = true; }

    notRequired() { this.viewModel.isRequired = false; }

    dispose() {
        this.eventManager.dispose();
        super.dispose();
    }
}