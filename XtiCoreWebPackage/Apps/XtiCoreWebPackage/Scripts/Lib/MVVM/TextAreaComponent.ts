import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { CustomEventRegistrations } from "./EventManager";
import { FocusableComponentChangeHandler, FocusableComponentMixin, FocusableViewMixin, FocusableViewModelMixin, HasFocusProperty, IFocusableView, IFocusableViewModel } from "./FocusableComponent";
import { InputTextValue, ITextInputView, ITextInputViewModel, TextInputComponentChangeHandler, TextInputComponentMixin, TextInputComponentViewMixin, TextInputValueChangeHandler, TextInputValueComponentMixin, TextInputViewModelMixin } from "./InputComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { IUniqueView, IUniqueViewModel, UniqueComponentChangeHandler, UniqueComponentMixin, UniqueViewMixin, UniqueViewModelMixin } from "./UniqueComponent";

export interface ITextAreaViewModel {
    get numberOfColumns(): number;
    set numberOfColumns(numberOfColumns: number);

    get numberOfRows(): number;
    set numberOfRows(numberOfRows: number);
}

export type BaseTextAreaComponentViewModel = ComponentViewModel & IUniqueViewModel & IFocusableViewModel & ITextInputViewModel & ITextAreaViewModel;

export class TextAreaComponentViewModel
    extends TextInputViewModelMixin(UniqueViewModelMixin(FocusableViewModelMixin(ComponentViewModel)))
    implements ITextInputViewModel, ITextAreaViewModel {

    private _numberOfColumns = 0;
    get numberOfColumns() { return this._numberOfColumns; }
    set numberOfColumns(numberOfColumns: number) { this._numberOfColumns = numberOfColumns; }

    private _numberOfRows = 0;
    get numberOfRows() { return this._numberOfRows; }
    set numberOfRows(numberOfRows: number) { this._numberOfRows = numberOfRows; }
}

export interface ITextAreaView {
    readonly when: CustomEventRegistrations<TextAreaViewEventLayout>;

    setNumberOfColumns(numberOfColumns: number): void;
    setNumberOfRows(numberOfRows: number): void;
}

export type BaseTextAreaComponentView = ComponentView & IFocusableView & IUniqueView & ITextInputView & ITextAreaView;

type TextAreaViewEventLayout = {
    textValueInput: InputEvent;
    focused: FocusEvent;
    blurred: FocusEvent;
}

export class TextAreaComponentView
    extends TextInputComponentViewMixin(FocusableViewMixin(UniqueViewMixin(StyleableComponentViewMixin(ComponentView))))
    implements ITextInputView, ITextAreaView {

    constructor() {
        super("textarea");
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

    private readonly events = this.eventManager.addEvents<TextAreaViewEventLayout>({
        textValueInput: null,
        focused: null,
        blurred: null
    });
    readonly when = this.events.when;

    private get textAreaElement() { return this.element as HTMLTextAreaElement | null; }

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
        const element = this.textAreaElement;
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
        const element = this.textAreaElement;
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
        const element = this.textAreaElement;
        if (element) {
            element.dispatchEvent(
                new Event("blur", {
                    bubbles: true,
                    cancelable: true
                })
            );
        }
    }

    setNumberOfColumns(numberOfColumns: number) {
        this.setAttributes({ "cols": numberOfColumns ? numberOfColumns.toString() : null });
    }

    setNumberOfRows(numberOfRows: number) {
        this.setAttributes({ "rows": numberOfRows ? numberOfRows.toString() : null });
    }
}

type TextAreaComponentEventLayout = {
    textValueChanged: string
};

export class TextAreaChangeHandler extends ComponentChangeHandler<BaseTextAreaComponentViewModel, BaseTextAreaComponentView> {

    handleChanges(changes: ObservableChanges<BaseTextAreaComponentViewModel>) {
        if (changes.numberOfColumns) {
            const numberOfColumns = changes.numberOfColumns.value;
            this.updateView(v => v.setNumberOfColumns(numberOfColumns));
        }
        if (changes.numberOfRows) {
            const numberOfRows = changes.numberOfRows.value;
            this.updateView(v => v.setNumberOfRows(numberOfRows));
        }
    }

}

export class TextAreaComponent
    extends TextInputValueComponentMixin(TextInputComponentMixin(UniqueComponentMixin(FocusableComponentMixin(Component)))) {

    private readonly events = this.eventManager.addEvents<TextAreaComponentEventLayout>({
        textValueChanged: null
    });
    readonly when = this.events.when;

    constructor(
        protected readonly viewModel: BaseTextAreaComponentViewModel,
        protected readonly view: BaseTextAreaComponentView
    ) {
        super(
            viewModel,
            view,
            new UniqueComponentChangeHandler(viewModel, view),
            new FocusableComponentChangeHandler(viewModel, view),
            new TextInputValueChangeHandler(viewModel, view),
            new TextInputComponentChangeHandler(viewModel, view),
            new TextAreaChangeHandler(viewModel, view)
        );
        view.when.textValueInput.then(this.onTextValueChangedFromUI.bind(this));
        view.when.focused.then(this.onFocusFromUI.bind(this));
        view.when.blurred.then(this.onBlurFromUI.bind(this));
    }

    protected handleChanges(changes: ObservableChanges<BaseTextAreaComponentViewModel>) {
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

    get numberOfColumns() { return this.viewModel.numberOfColumns; }
    set numberOfColumns(numberOfColumns: number) { this.viewModel.numberOfColumns = numberOfColumns; }

    get numberOfRows() { return this.viewModel.numberOfRows; }
    set numberOfRows(numberOfRows: number) { this.viewModel.numberOfRows = numberOfRows; }
}