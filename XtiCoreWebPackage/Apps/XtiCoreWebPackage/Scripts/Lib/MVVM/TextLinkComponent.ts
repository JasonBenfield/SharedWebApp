import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { BaseCompositeComponentView, CompositeComponentView } from "./CompositeComponent";
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

export class LinkWithTextComponentView<
    TLayout extends ComponentViewLayout<TLayout>
> extends LinkViewMixin(CompositeComponentView)<TLayout, BaseTextComponentView> implements ILinkView {

    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        return new LinkWithTextComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => TextLinkCompositeComponentView<TLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextLinkCompositeComponentView<
    TLayout extends ComponentViewLayout<TLayout>
    > extends BaseCompositeComponentView<TLayout, BaseTextLinkComponentView> implements ITextView, ILinkView {

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new TextLinkCompositeComponentView("div", layout, toPublicLayout).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new TextLinkCompositeComponentView("span", layout, toPublicLayout).asLayout();
    }

    static listItem<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new TextLinkCompositeComponentView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => TextLinkCompositeComponentView<TLayout> & TLayout;

    setHref(href: string) {
        this.publicLayout.setHref(href);
    }

    setTarget(target: string) {
        this.publicLayout.setTarget(target);
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