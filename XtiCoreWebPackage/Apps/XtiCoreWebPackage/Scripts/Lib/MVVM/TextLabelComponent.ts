import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { ILabelView, ILabelViewModel, LabelComponentChangeHandler, LabelComponentMixin, LabelViewMixin, LabelViewModelMixin } from "./LabelComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, ISynchedTitleViewModel, ITextView, ITextViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export class TextLabelComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LabelViewModelMixin(TitleViewModelMixin(ComponentViewModel)))) {
}

export type BaseTextLabelComponentViewModel = ComponentViewModel & ILabelViewModel & ITitleViewModel & ITextViewModel & ISynchedTitleViewModel;

export type BaseTextLabelComponentView = ComponentView & ITitleView & ILabelView & ITextView;

class BaseTitleCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends TitleViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

export class LabelContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends LabelViewMixin(BaseTitleCompositeComponentView)<TLayout, TPublicLayout>
    implements ILabelView, ITitleView, ITextView {

    static create<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new LabelContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("label", layout, toPublicLayout);
    }

    declare asLayout: () => LabelContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class ContainerOfTextLabelView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>
    extends BaseTitleCompositeComponentView<TLayout, TPublicLayout>
    implements ILabelView, ITitleView, ITextView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextLabelView("div", layout, toPublicLayout).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }

    declare asLayout: () => ContainerOfTextLabelView<TLayout, TPublicLayout> & TLayout;

    setFor(forID: string) {
        this.publicLayout.setFor(forID);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextLabelComponentView
    extends TitleViewMixin(TextViewMixin(LabelViewMixin(StyleableComponentViewMixin(ComponentView))))
    implements ITitleView, ITextView, ILabelView {

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