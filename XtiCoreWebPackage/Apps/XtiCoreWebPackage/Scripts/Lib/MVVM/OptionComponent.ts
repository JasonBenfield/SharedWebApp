import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { TextChangeHandler, TextViewMixin } from "./TextComponent";

export interface IOptionComponentViewModel<TValue> {
    readonly value: TValue;

    get formattedValue(): string | null;
    set formattedValue(value: string | null);

    get text(): string;
    set text(text: string);
}

export type BaseOptionComponentViewModel<TValue> = ComponentViewModel & IOptionComponentViewModel<TValue>;

export class OptionComponentViewModel<TValue> extends ComponentViewModel implements IOptionComponentViewModel<TValue> {

    constructor(readonly value: TValue) {
        super();
    }

    private _formattedValue: string | null = null;
    get formattedValue() { return this._formattedValue; }
    set formattedValue(value: string | null) { this._formattedValue = value; }

    private _text = "";
    get text() { return this._text; }
    set text(text: string) { this._text = text; }

}

export interface IOptionComponentView {
    setValue(value: string): void;
    clearValue(): void;
    setText(text: string): void;
}

export type BaseOptionComponentView = ComponentView & IOptionComponentView;

export class OptionComponentView
    extends TextViewMixin(StyleableComponentViewMixin(ComponentView))
    implements IOptionComponentView {

    constructor() {
        super("option");
    }

    setValue(value: string) {
        this.setAttribute("value", value);
    }

    clearValue() {
        this.removeAttribute("value");
    }
}

export class OptionComponentChangeHandler<TValue> extends ComponentChangeHandler<BaseOptionComponentViewModel<TValue>, BaseOptionComponentView> {
    constructor(viewModel: BaseOptionComponentViewModel<TValue>, view: BaseOptionComponentView) {
        super(viewModel, view);
    }

    handleChanges(changes: ObservableChanges<BaseOptionComponentViewModel<TValue>>) {
        if (changes.formattedValue) {
            const formattedValue = changes.formattedValue.value;
            this.updateView(v => {
                if (formattedValue === null) {
                    v.clearValue();
                }
                else {
                    v.setValue(formattedValue);
                }
            });
        }
    }
}

export class OptionComponent<TValue> extends Component {
    constructor(
        protected readonly viewModel: BaseOptionComponentViewModel<TValue>,
        view: BaseOptionComponentView
    ) {
        super(
            viewModel,
            view,
            new TextChangeHandler(viewModel, view),
            new OptionComponentChangeHandler(viewModel, view)
        );
    }

    get value() { return this.viewModel.value; }

    get formattedValue() { return this.viewModel.formattedValue; }
    set formattedValue(foramttedValue: string | null) { this.viewModel.formattedValue = foramttedValue; }

    get text() { return this.viewModel.text; }
    set text(text: string) { this.viewModel.text = text; }
}

export interface IOptionComponentUpdater<TValue> {
    isMatch?: (value1: TValue, value2: TValue) => boolean;
    formatValue?: (source: TValue) => string | null;
    formatText?: (source: TValue) => string;
}
