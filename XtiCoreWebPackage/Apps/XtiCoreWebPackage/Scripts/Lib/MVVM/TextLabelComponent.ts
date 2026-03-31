import { Component } from "./Component";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { ILabelView, ILabelViewModel, LabelComponentChangeHandler, LabelComponentMixin, LabelViewMixin, LabelViewModelMixin } from "./LabelComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, ISynchedTitleViewModel, ITextView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export class TextLabelComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LabelViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
    constructor(initializer: ComponentViewModelInitializer<TextLabelComponentViewModel> = {}) {
        super(initializer);
    }
}

export type BaseTextLabelComponentViewModel = ComponentViewModel & ILabelViewModel & ITitleViewModel & ITextViewModel & ISynchedTitleViewModel;

export type BaseTextLabelComponentView = ComponentView & ITitleView & ILabelView & ITextView;

export class TextLabelCompositeComponentView<
    TLayout extends IComponentViewLayout,
    TPublicLayout extends BaseTextComponentView
> extends LabelViewMixin(CompositeComponentView)<TLayout, TPublicLayout> implements ITextView {
    static create<TLayout extends IComponentViewLayout, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextLabelCompositeComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("label", layout, toPublicLayout);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextLabelComponentView extends TextViewMixin(LabelViewMixin(StyleableComponentViewMixin(ComponentView))) {
    constructor() {
        super("label");
    }
}

export class TextLabelComponent extends SynchedTitleComponentMixin(TextComponentMixin(LabelComponentMixin(TitleComponentMixin(Component)))) {
    constructor(viewModel: BaseTextLabelComponentViewModel, view: BaseTextLabelComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LabelComponentChangeHandler(viewModel, view),
            new TextChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view)
        );
    }
}