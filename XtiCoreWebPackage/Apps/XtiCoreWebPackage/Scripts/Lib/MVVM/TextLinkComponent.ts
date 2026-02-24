import { Component } from "./Component";
import { ComponentView, IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { ITextView, ITextViewModel, TextChangeHandler, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export type ITextLinkComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ILinkViewModel;

export class TextLinkComponentViewModel extends TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel))) {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
    }

    createComponent(view: ITextLinkComponentView) {
        return new TextLinkComponent(this, view);
    }
}

export type ITextLinkComponentView = IComponentView & ITitleView & ILinkView & ITextView;

export class TextLinkComponentView extends TextViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView))) implements ITextLinkComponentView {
    constructor() {
        super("a");
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