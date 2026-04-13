import { ButtonComponentChangeHandler, ButtonComponentMixin, ButtonComponentViewModelMixin, ButtonViewMixin, IButtonComponentViewModel, IButtonView } from "./ButtonComponent";
import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, ISynchedTitleViewModel, ITextView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export class TextButtonComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(ButtonComponentViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
}

export type BaseTextButtonComponentViewModel = ComponentViewModel & IButtonComponentViewModel & ITitleViewModel & ITextViewModel & ISynchedTitleViewModel;

export type BaseTextButtonComponentView = ComponentView & IStyleableComponentView & ITitleView & IButtonView & ITextView;

export class ButtonWithTextComponentView<
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends BaseTextComponentView
> extends ButtonViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> implements ITextView {
    static create<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ButtonWithTextComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => ButtonWithTextComponentView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextButtonCompositeComponentView<
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends BaseTextButtonComponentView
> extends BaseCompositeComponentView<TLayout, TPublicLayout> implements IButtonView, ITextView {
    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextButtonCompositeComponentView("div", layout, toPublicLayout).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }

    readonly when = this.publicLayout.when;

    enable() { this.publicLayout.enable(); }

    disable() { this.publicLayout.disable(); }

    declare asLayout: () => TextButtonCompositeComponentView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextButtonComponentView extends TitleViewMixin(TextViewMixin(ButtonViewMixin(StyleableComponentViewMixin(ComponentView))))
    implements ITitleView, ITextView, IButtonView {
    constructor() {
        super("button");
    }
}

export class TextButtonComponent extends SynchedTitleComponentMixin(TextComponentMixin(ButtonComponentMixin(TitleComponentMixin(Component)))) {
    constructor(viewModel: BaseTextButtonComponentViewModel, view: BaseTextButtonComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new ButtonComponentChangeHandler(viewModel, view),
            new TextChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view)
        );
    }
}