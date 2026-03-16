import { ConsoleLogger } from "../ConsoleLogger";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { IEquatable } from "./Equatable";
import { EventManager } from "./EventManager";
import { FocusableComponentMixin, FocusableViewMixin, FocusableViewModelMixin, HasFocusProperty } from "./FocusableComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";

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

export class InputComponentViewModel extends FocusableViewModelMixin(ComponentViewModel) {
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
}

type InputViewEventLayout = {
    textValueInput: InputEvent;
    focused: FocusEvent;
    blurred: FocusEvent;
}

export class InputComponentView extends FocusableViewMixin(StyleableComponentViewMixin(ComponentView)) {
    private readonly _eventManager = new EventManager<InputViewEventLayout>({
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

    setTextValue(textValue: string) {
        this.setAttribute("value", textValue);
    }

    setPlaceholder(placeholder: string) {
        this.setAttribute("placeholder", placeholder);
    }

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
        return this._eventManager.when;
    }

    private handleInputEvent(evt: InputEvent) {
        this._eventManager.events.textValueInput.invoke(evt);
    }

    private handleFocusEvent(evt: FocusEvent) {
        this._eventManager.events.focused.invoke(evt);
    }

    private handleBlurEvent(evt: FocusEvent) {
        this._eventManager.events.blurred.invoke(evt);
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

export class InputComponentChangeHandler extends ComponentChangeHandler<InputComponentViewModel, InputComponentView> {
    constructor(viewModel: InputComponentViewModel, view: InputComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<InputComponentViewModel>) {
        if (changes.textValue) {
            const textValue: InputTextValue = changes.textValue.value;
            if (!textValue.isFromUI) {
                this.updateView(v => v.setTextValue(textValue.value));
            }
        }
        if (changes.placeholder) {
            const placeholder: string = changes.placeholder.value;
            this.updateView(v => v.setPlaceholder(placeholder));
        }
    }
}

export class InputComponent extends FocusableComponentMixin(Component) {
    constructor(
        protected readonly viewModel: InputComponentViewModel,
        protected readonly view: InputComponentView
    ) {
        super(
            viewModel,
            view,
            new InputComponentChangeHandler(viewModel, view)
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

    get textValue() { return this.viewModel.textValue.value; }
    set textValue(textValue: string) { this.viewModel.textValue = new InputTextValue(textValue, false); }

    get placeholder() { return this.viewModel.placeholder; }
    set placeholder(placeholder: string) { this.viewModel.placeholder = placeholder; }
}