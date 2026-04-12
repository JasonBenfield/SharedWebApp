import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, BaseTextComponentViewModel, ITextView, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";

export class TextLinkComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
}

export type BaseTextLinkComponentViewModel = BaseTextComponentViewModel & ILinkViewModel;

export type BaseTextLinkComponentView = BaseTextComponentView & ILinkView;

export class BaseLinkCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends LinkViewMixin(BaseCompositeComponentView)<TLayout, BaseTextComponentView> {
    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        super("a", layout, toPublicLayout);
    }
}

export class LinkContainerOfTextView<
    TLayout extends ComponentViewLayout<TLayout>
> extends TitleViewMixin(BaseLinkCompositeComponentView)<TLayout, BaseTextComponentView> {

    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        return new LinkContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextComponentView) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => LinkContainerOfTextView<TLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class ContainerOfTextLinkView<
    TLayout extends ComponentViewLayout<TLayout>
> extends BaseCompositeComponentView<TLayout, BaseTextLinkComponentView> implements ITextView, ILinkView {

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new ContainerOfTextLinkView("div", layout, toPublicLayout).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new ContainerOfTextLinkView("span", layout, toPublicLayout).asLayout();
    }

    static listItem<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => BaseTextLinkComponentView) {
        return new ContainerOfTextLinkView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => ContainerOfTextLinkView<TLayout> & TLayout;

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

export class TextLinkComponentView extends TitleViewMixin(TextViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView)))) {
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