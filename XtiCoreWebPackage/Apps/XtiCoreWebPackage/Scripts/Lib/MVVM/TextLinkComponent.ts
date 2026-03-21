import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, BaseTextComponentViewModel, ITextComponentView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleViewModel } from "./Types";

export type ITextLinkComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ILinkViewModel;

export class TextLinkComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
    }
}

export type BaseTextLinkComponentView = BaseTextComponentView & ILinkView;

export type BaseTextLinkComponentViewModel = BaseTextComponentViewModel & ILinkViewModel;

export class TextLinkComponentView extends TextViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView))) implements ITextComponentView {
    constructor() {
        super("a");
    }

    readonly text = this;
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