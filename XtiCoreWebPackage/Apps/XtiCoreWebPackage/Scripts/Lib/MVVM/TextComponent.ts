import { Component } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";

export class TextComponentViewModel extends ComponentViewModel {
    constructor(initializer: ComponentViewModelInitializer<TextComponentViewModel> = {}) {
        super(initializer);
    }

    private _text = "";
    get text() { return this._text; }
    set text(text: string) { this._text = text; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }
}

export interface ITextComponentView extends IComponentView {
    setText(text: string): void;
    setTitle(title: string): void;
}

export class TextComponentView extends StyleableComponentView implements ITextComponentView {
    static block() {
        return new TextComponentView(() => document.createElement("div"));
    }

    static span() {
        return new TextComponentView(() => document.createElement("span"));
    }

    static label() {
        return new TextComponentView(() => document.createElement("label"));
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new TextComponentView(() => document.createElement(`h${size}`));
    }

    private _text = "";

    constructor(createElement: () => HTMLElement) {
        super(createElement);
    }

    declare setTitle: (title: string) => void;

    setText(text: string) {
        this._text = text;
        const element = this.element;
        if (element) {
            element.innerText = text;
        }
    }

    addToParent(parent: HTMLElement) {
        super.addToParent(parent);
        const element = this.element;
        if (element) {
            element.innerText = this._text;
        }
    }
}

export class TextComponent extends Component {
    constructor(protected readonly viewModel: TextComponentViewModel, protected readonly view: ITextComponentView) {
        super(viewModel, view);
    }

    protected handleChanges(changes: ObservableChanges<TextComponentViewModel>) {
        super.handleChanges(changes);
        if (changes.text) {
            this.view.setText(changes.text.value);
        }
        if (changes.title) {
            this.view.setTitle(changes.title.value);
        }
    }

    get text() { return this.viewModel.text; }

    set text(text: string) {
        this.viewModel.text = text;
    }

    get title() { return this.viewModel.title; }

    set title(title: string) {
        this.viewModel.title = title;
    }
}