import { Component } from "./Component";
import { IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentViewModel, ITextView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export type ITextLinkComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ILinkViewModel;

export class TextLinkComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
    constructor(initializer: ComponentViewModelInitializer<TextLinkComponentViewModel> = {}) {
        super(initializer);
    }
}

export type BaseTextLinkComponentView = ComponentView & ITitleView & ILinkView & ITextView;

export type BaseTextLinkComponentViewModel = BaseTextComponentViewModel & ILinkViewModel;

export class TextLinkComponentView extends TextViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView))) implements BaseTextLinkComponentView {
    constructor() {
        super("a");
    }
}

export class TextLinkComponent extends SynchedTitleComponentMixin(TextComponentMixin(LinkComponentMixin(TitleComponentMixin(Component)))) {
    constructor(protected readonly viewModel: BaseTextLinkComponentViewModel, view: BaseTextLinkComponentView) {
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

export class TextLinkComponentFactory implements IComponentFactory {
    create(viewModel: BaseTextLinkComponentViewModel, view: BaseTextLinkComponentView) {
        return new TextLinkComponent(viewModel, view);
    }
}