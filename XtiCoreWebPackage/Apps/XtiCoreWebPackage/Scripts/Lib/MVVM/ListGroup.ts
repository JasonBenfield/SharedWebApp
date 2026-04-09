import { ContextualClass } from "../Bootstrap/ContextualClass";
import { ListGroupCss, ListGroupItemCss } from "../Bootstrap/ListGroupCss";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { BaseGridRowView, GridRowLinkView, GridRowLinkWithTextView, GridRowTextCompositeView, GridRowView, GridRowViewLayout, GridRowViewMixin, GridViewMixin } from "./GridView";
import { LinkViewMixin } from "./LinkComponent";
import { ListViewMixin } from "./ListComponent";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, TextViewMixin, TitleViewMixin } from "./TextComponent";
import { Constructor } from "./Types";


export function ListGroupViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
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

export class ListGroupView extends ListGroupViewMixin(ListViewMixin(StyleableComponentViewMixin(ComponentView))) {
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

export function ListGroupItemViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
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

export class TextCompositeListGroupItemView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(TextViewMixin(TitleViewMixin(BaseCompositeComponentView))) {
    static listItem<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextCompositeListGroupItemView("li", layout, toPublicLayout).asLayout();
    }

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextCompositeListGroupItemView("div", layout, toPublicLayout).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }

    declare asLayout: () => TextCompositeListGroupItemView<TLayout, TPublicLayout> & TLayout;
}

export class TextListGroupItemView extends ListGroupItemViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView)))) {
    static block() {
        return new TextListGroupItemView("div");
    }

    static listItem() {
        return new TextListGroupItemView("li");
    }
}

export class TextLinkListGroupItemView extends ListGroupItemViewMixin(LinkViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView))))) {
    static create() {
        return new TextListGroupItemView();
    }

    constructor() {
        super("a");
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

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridTextListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(GridRowTextCompositeView)<TLayout, TPublicLayout> {
    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridTextListGroupItemView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridTextListGroupItemView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridTextListGroupItemView<TLayout, TPublicLayout> & TLayout;

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridLinkListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends ListGroupItemViewMixin(GridRowLinkView)<TLayout, TPublicLayout> {
    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridLinkListGroupItemView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridLinkListGroupItemView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridLinkListGroupItemView<TLayout, TPublicLayout> & TLayout;

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridButtonListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends ListGroupItemViewMixin(GridRowView)<TLayout, TPublicLayout> {
    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return GridButtonListGroupItemView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridButtonListGroupItemView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => GridButtonListGroupItemView<TLayout, TPublicLayout> & TLayout;

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridButtonWithTextListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(GridRowTextCompositeView)<TLayout, TPublicLayout> {
    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridButtonWithTextListGroupItemView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => GridButtonWithTextListGroupItemView<TLayout, TPublicLayout> & TLayout;

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridLinkWithTextListGroupItemView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(GridRowLinkWithTextView)<TLayout, TPublicLayout> {
    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridLinkWithTextListGroupItemView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(layout, toPublicLayout);
    }

    declare asLayout: () => GridLinkWithTextListGroupItemView<TLayout, TPublicLayout> & TLayout;

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}
