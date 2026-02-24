import { Component } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, IComponentFactory, ObservableChanges } from "./ComponentViewModel";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkTargetType } from "./LinkComponent";
import { ITextView, ITextViewModel, TextChangeHandler, TextComponentView, TitleChangeHandler } from "./TextComponent";
import { ITitleViewModel } from "./Types";

export type ITextLinkComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ILinkViewModel;

class TextLinkComponentFactory implements IComponentFactory {
    create(viewModel: TextLinkComponentViewModel, view: ITextLinkComponentView) {
        return new TextLinkComponent(viewModel, view);
    }
}

export class TextLinkComponentViewModel extends ComponentViewModel implements ILinkViewModel, ITextViewModel, ITitleViewModel {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
        this.setComponentFactory(new TextLinkComponentFactory());
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

    declare createComponent: (view: ITextLinkComponentView) => TextLinkComponent;
}

export type ITextLinkComponentView = IComponentView & ILinkView & ITextView;

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
        super(
            viewModel,
            view,
            new TitleChangeHandler(view),
            new TextChangeHandler(view),
            new LinkComponentChangeHandler(view)
        );
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