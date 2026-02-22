import { Component } from "./Component";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { ILinkComponentView, LinkTargetType } from "./LinkComponent";
import { ITextComponentView, TextComponentView } from "./TextComponent";

export class TextLinkComponentViewModel extends ComponentViewModel {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
    }

    private _text = "";
    get text() { return this._text; }
    set text(text: string) { this._text = text; }

    private _target: LinkTargetType = "";
    get target() { return this._target; }
    set target(target: LinkTargetType) { this._target = target; }

    private _href = "";
    get href() { return this._href; }
    set href(href: string) { this._href = href; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }
}

export type ITextLinkComponentView = ILinkComponentView & ITextComponentView;

export class TextLinkComponentView extends TextComponentView implements ITextLinkComponentView {
    constructor() {
        super(() => document.createElement("a"));
    }

    declare setTitle: (title: string) => void;

    setHref(href: string) {
        this.setAttribute("href", href);
    }

    setTarget(target: string) {
        this.setAttribute("target", target === "" ? null : target);
    }
}

export class TextLinkComponent extends Component {
    constructor(protected readonly viewModel: TextLinkComponentViewModel, view: ITextLinkComponentView) {
        super(viewModel, view);
    }

    declare protected readonly view: ITextLinkComponentView;

    protected handleChanges(changes: ObservableChanges<TextLinkComponentViewModel>) {
        super.handleChanges(changes);
        if (changes.text) {
            this.view.setText(changes.text.value);
        }
        if (changes.title) {
            this.view.setTitle(changes.title.value);
        }
        if (changes.href) {
            this.view.setHref(changes.href.value);
        }
        if (changes.target) {
            this.view.setTarget(changes.target.value);
        }
    }

    get text() { return this.viewModel.text; }

    set text(text: string) {
        this.viewModel.text = text;
    }

    get href() { return this.viewModel.href; }

    set href(href: string) {
        this.viewModel.href = href;
    }

    get title() { return this.viewModel.title; }

    set title(title: string) {
        this.viewModel.title = title;
    }

    get isTargetBlank() { return this.viewModel.target === "_blank"; }

    setTargetToBlank() {
        this.viewModel.target = "_blank";
    }

    setTargetToDefault() {
        this.viewModel.target = "";
    }
}