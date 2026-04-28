import { ContextualClass } from "../Bootstrap/ContextualClass";
import { ListGroupCss, ListGroupItemCss } from "../Bootstrap/ListGroupCss";
import { ButtonViewMixin } from "./ButtonComponent";
import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { BaseGridRowView, GridRowButtonContainerOfTextView, GridRowButtonView, GridRowContainerOfTextButtonView, GridRowContainerOfTextLabelView, GridRowContainerOfTextLinkView, GridRowContainerOfTextView, GridRowLabelContainerOfTextView, GridRowLabelView, GridRowLinkContainerOfTextView, GridRowLinkView, GridRowView, GridRowViewLayout, GridViewMixin } from "./GridView";
import { LabelViewMixin } from "./LabelComponent";
import { BaseLinkComponentView, BaseLinkComponentViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { ListViewMixin } from "./ListComponent";
import { StyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextButtonComponentView } from "./TextButtonComponent";
import { BaseTextComponentView, BaseTextComponentViewModel, SynchedTitleChangeHandler, SynchedTitleComponentMixin, SynchedTitleViewModelMixin, TextChangeHandler, TextComponentMixin, TextViewMixin, TextViewModelMixin, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { BaseTextLabelComponentView } from "./TextLabelComponent";
import { BaseTextLinkComponentView, BaseTextLinkComponentViewModel } from "./TextLinkComponent";
import { Constructor } from "./Types";


export function ListGroupViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base {
        private readonly listGroupCss = new ListGroupCss();
        constructor(...args: any[]) {
            super(...args);
            this.setCss(this.listGroupCss);
        }

        styleAsFlush() {
            this.listGroupCss.flush();
            this.setCss(this.listGroupCss);
        }
    }
}

export class ListGroupView extends ListGroupViewMixin(ListViewMixin(StyleableComponentView)) {
    static unorderedList() {
        return new ListGroupView("ul");
    }

    static list() {
        return new ListGroupView("div");
    }

    constructor(listTagName: string) {
        super(listTagName);
    }
}

export interface IListGroupItemView {
    styleAsActiveSelection(): this;
    styleAsNotActiveSelection(): this;
    styleAsAction(): this;
    styleAsNotAnAction(): this;
    setContext(context: ContextualClass): this;
}

export function ListGroupItemViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base implements IListGroupItemView {
        constructor(...args: any[]) {
            super(...args);
            this.setCss(this.listGroupItemCss);
        }

        private readonly listGroupItemCss = new ListGroupItemCss();

        styleAsActiveSelection() {
            return this.setListGroupItemCss(css => css.activeSelection());
        }

        styleAsNotActiveSelection() {
            return this.setListGroupItemCss(css => css.notActiveSelection());
        }

        styleAsAction() {
            return this.setListGroupItemCss(css => css.action());
        }

        styleAsNotAnAction() {
            return this.setListGroupItemCss(css => css.notAnAction());
        }

        setContext(context: ContextualClass) {
            return this.setListGroupItemCss(css => css.context(context));
        }

        protected setListGroupItemCss(configure: (css: ListGroupItemCss) => void) {
            configure(this.listGroupItemCss);
            this.setCss(this.listGroupItemCss);
            return this;
        }
    }
}

export class GridListGroupView extends GridViewMixin(ListGroupViewMixin(ListViewMixin(StyleableComponentViewMixin(ComponentView)))) {
    static unorderedList() {
        return new GridListGroupView("ul");
    }

    static block() {
        return new GridListGroupView("div");
    }

    constructor(listTagName = "div") {
        super(listTagName);
    }


    declare addItem: (view: BaseGridRowView) => void;

    declare insertItem: (view: BaseGridRowView, index: number) => void;

    declare removeItem: (view: BaseGridRowView) => void;
}

export class ListGroupItemView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>> extends ListGroupItemViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static listItem<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return new ListGroupItemView("li", layout, l => Object.assign({}, l)).asLayout();
    }

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return new ListGroupItemView("div", layout, l => Object.assign({}, l)).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }

    declare asLayout: () => ListGroupItemView<TLayout, TPublicLayout> & TLayout;
}

export class LinkListGroupItemView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>> extends ListGroupItemViewMixin(LinkViewMixin(BaseCompositeComponentView)) {
    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return new LinkListGroupItemView(layout, l => Object.assign({}, l)).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => LinkListGroupItemView<TLayout, TPublicLayout> & TLayout;
}

export class ListGroupItemContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(TextViewMixin(TitleViewMixin(BaseCompositeComponentView))) {
    static listItem<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ListGroupItemContainerOfTextView("li", layout, toPublicLayout).asLayout();
    }

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ListGroupItemContainerOfTextView("div", layout, toPublicLayout).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }

    declare asLayout: () => ListGroupItemContainerOfTextView<TLayout, TPublicLayout> & TLayout;
}

export class TextListGroupItemView extends ListGroupItemViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView)))) {
    static block() {
        return new TextListGroupItemView("div");
    }

    static listItem() {
        return new TextListGroupItemView("li");
    }
}

export class ListGroupItemTextLinkView extends ListGroupItemViewMixin(LinkViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView))))) {
    static create() {
        return new ListGroupItemTextLinkView();
    }

    constructor() {
        super("a");
    }
}

export class ListGroupItemTextButtonView extends ListGroupItemViewMixin(ButtonViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView))))) {
    static create() {
        return new ListGroupItemTextButtonView();
    }

    constructor() {
        super("button");
    }
}

export class ListGroupItemTextLabelView extends ListGroupItemViewMixin(LabelViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView))))) {
    static create() {
        return new ListGroupItemTextLabelView();
    }

    constructor() {
        super("label");
    }
}

export class GridListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends ListGroupItemViewMixin(GridRowView)<TLayout, TPublicLayout> {
    static listItem<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridListGroupItemView.listItemWithPublicLayout(layout, l => l);
    }

    static listItemWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemView("li", layout, toPublicLayout).asLayout();
    }

    static block<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridListGroupItemView.blockWithPublicLayout(layout, l => l);
    }

    static blockWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridListGroupItemView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(GridRowContainerOfTextView)<TLayout, TPublicLayout> {
    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridListGroupItemContainerOfTextView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemContainerOfTextLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>
    extends ListGroupItemViewMixin(GridRowContainerOfTextLinkView)<TLayout, TPublicLayout> {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextLinkView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextLinkView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridListGroupItemContainerOfTextLinkView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemContainerOfTextLabelView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>
    extends ListGroupItemViewMixin(GridRowContainerOfTextLabelView)<TLayout, TPublicLayout> {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextLabelView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextLabelView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridListGroupItemContainerOfTextLabelView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemContainerOfTextButtonView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>
    extends ListGroupItemViewMixin(GridRowContainerOfTextButtonView)<TLayout, TPublicLayout> {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextButtonView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemContainerOfTextButtonView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridListGroupItemContainerOfTextButtonView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends ListGroupItemViewMixin(GridRowLinkView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridListGroupItemLinkView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemLinkView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemLinkView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemLabelView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends ListGroupItemViewMixin(GridRowLabelView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridListGroupItemLabelView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemLabelView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemLabelView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemButtonView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends ListGroupItemViewMixin(GridRowButtonView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridListGroupItemButtonView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemButtonView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemButtonView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemButtonContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends ListGroupItemViewMixin(GridRowButtonContainerOfTextView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemButtonContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemButtonContainerOfTextView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemLinkContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends ListGroupItemViewMixin(GridRowLinkContainerOfTextView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemLinkContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemLinkContainerOfTextView<TLayout, TPublicLayout> & TLayout;
}

export class GridListGroupItemLabelContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends ListGroupItemViewMixin(GridRowLabelContainerOfTextView)<TLayout, TPublicLayout> {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemLabelContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridListGroupItemLabelContainerOfTextView<TLayout, TPublicLayout> & TLayout;
}

export interface IListGroupItemViewModel {
    get context(): ContextualClass;
    set context(context: ContextualClass);

    get isActiveSelection(): boolean;
    set isActiveSelection(isActiveSelection: boolean);
}

export function ListGroupItemViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements IListGroupItemViewModel {
        private _context = ContextualClass.default;
        get context() { return this._context; }
        set context(context: ContextualClass) { this._context = context; }

        private _isActiveSelection = false;
        get isActiveSelection() { return this._isActiveSelection; }
        set isActiveSelection(isActiveSelection: boolean) { this._isActiveSelection = isActiveSelection; }
    }
}

export class ListGroupItemViewModel extends ListGroupItemViewModelMixin(ComponentViewModel) {
}

export interface IListGroupItem {
    get context(): ContextualClass;
    set context(context: ContextualClass);

    get isActiveSelection(): boolean;
    set isActiveSelection(isActiveSelection: boolean);
}

export function ListGroupItemMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base implements IListGroupItem {
        declare protected readonly viewModel: ComponentViewModel & IListGroupItemViewModel;

        get context() { return this.viewModel.context; }
        set context(context: ContextualClass) { this.viewModel.context = context; }

        get isActiveSelection() { return this.viewModel.isActiveSelection; }
        set isActiveSelection(isActiveSelection: boolean) { this.viewModel.isActiveSelection = isActiveSelection; }
    }
}

export class ListGroupItemChangeHandler extends ComponentChangeHandler<ComponentViewModel & IListGroupItemViewModel, ComponentView & IListGroupItemView> {
    handleChanges(changes: ObservableChanges<ComponentViewModel & IListGroupItemViewModel>) {
        if (changes.context) {
            const context = changes.context.value;
            this.updateView(v => v.setContext(context));
        }
        if (changes.isActiveSelection) {
            const isActiveSelection = changes.isActiveSelection.value;
            this.updateView(v => {
                if (isActiveSelection) {
                    v.styleAsActiveSelection();
                }
                else {
                    v.styleAsNotActiveSelection();
                }
            });
        }
    }

}

export class ListGroupItem extends ListGroupItemMixin(Component) {
    constructor(viewModel: ComponentViewModel & IListGroupItemViewModel, view: ComponentView & IListGroupItemView) {
        super(viewModel, view, new ListGroupItemChangeHandler(viewModel, view));
    }
}

export class TextListGroupItemViewModel extends SynchedTitleViewModelMixin(TitleViewModelMixin(TextViewModelMixin(ListGroupItemViewModelMixin(ComponentViewModel)))) {
}

export class TextListGroupItem extends SynchedTitleComponentMixin(TitleComponentMixin(TextComponentMixin(ListGroupItemMixin(Component)))) {
    constructor(viewModel: BaseTextComponentViewModel & IListGroupItemViewModel, view: BaseTextComponentView & IListGroupItemView) {
        super(
            viewModel,
            view,
            new TextChangeHandler(viewModel, view),
            new TitleChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view),
            new ListGroupItemChangeHandler(viewModel, view)
        );
    }
}

export class LinkListGroupItemViewModel extends LinkViewModelMixin(TitleViewModelMixin(ListGroupItemViewModelMixin(ComponentViewModel))) {
}

export class LinkListGroupItem extends LinkComponentMixin(TitleComponentMixin(ListGroupItemMixin(Component))) {
    constructor(viewModel: BaseLinkComponentViewModel & IListGroupItemViewModel, view: BaseLinkComponentView & IListGroupItemView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view),
            new ListGroupItemChangeHandler(viewModel, view)
        );
    }
}

export class TextLinkListGroupItemViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(LinkViewModelMixin(TitleViewModelMixin(ListGroupItemViewModelMixin(ComponentViewModel))))) {
}

export class TextLinkListGroupItem extends SynchedTitleComponentMixin(TextComponentMixin(LinkComponentMixin(TitleComponentMixin(ListGroupItemMixin(Component))))) {
    constructor(viewModel: BaseTextLinkComponentViewModel & IListGroupItemViewModel, view: BaseTextLinkComponentView & IListGroupItemView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new TextChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view),
            new ListGroupItemChangeHandler(viewModel, view)
        );
    }
}
