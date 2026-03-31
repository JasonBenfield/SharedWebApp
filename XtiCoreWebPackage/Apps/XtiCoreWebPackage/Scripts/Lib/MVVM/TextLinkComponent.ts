import { Component } from "./Component";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, BaseTextComponentViewModel, ITextView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleViewModel } from "./Types";

export type ITextLinkComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ILinkViewModel;

export class TextLinkComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
    }
}

export type BaseTextLinkComponentView = BaseTextComponentView & ILinkView;

export type BaseTextLinkComponentViewModel = BaseTextComponentViewModel & ILinkViewModel;

export class TextLinkCompositeComponentView<
    TLayout extends IComponentViewLayout,
    TPublicLayout extends BaseTextComponentView
> extends LinkViewMixin(CompositeComponentView)<TLayout, TPublicLayout> implements ILinkView {
    static create<TLayout extends IComponentViewLayout, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextLinkCompositeComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextLinkComponentView extends TextViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView))) {
    constructor() {
        super("a");
    }
}

export class TextLinkComponent extends SynchedTitleComponentMixin(TextComponentMixin(LinkComponentMixin(TitleComponentMixin(Component)))) {
    constructor(viewModel: BaseTextLinkComponentViewModel, view: BaseTextLinkComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new TextChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view)
        );
    }
}