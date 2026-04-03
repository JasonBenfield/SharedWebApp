import { ContextualClass } from "../Bootstrap/ContextualClass";
import { ListGroupCss, ListGroupItemCss } from "../Bootstrap/ListGroupCss";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { BaseCompositeComponentView, CompositeComponentView } from "./CompositeComponent";
import { BaseGridRowView, GridRowViewMixin, GridViewMixin, IGridRowViewLayout } from "./GridView";
import { LinkViewMixin } from "./LinkComponent";
import { IListView, ListViewMixin } from "./ListComponent";
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

export function ListGroupItemViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base {
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
        return new ListGroupView("ul");
    }

    static block() {
        return new ListGroupView("div");
    }

    constructor(listTagName = "div") {
        super(listTagName);
    }


    declare addItem: (view: BaseGridRowView) => void;

    declare insertItem: (view: BaseGridRowView, index: number) => void;

    declare removeItem: (view: BaseGridRowView) => void;
}

export class ListGroupItemView<TLayout extends IComponentViewLayout, TPublicLayout extends IComponentViewLayout> extends ListGroupItemViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static listItem<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new ListGroupItemView("li", layout, l => Object.assign({}, l)).asLayout();
    }

    static block<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new ListGroupItemView("div", layout, l => Object.assign({}, l)).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }
}

export class LinkListGroupItemView<TLayout extends IComponentViewLayout, TPublicLayout extends IComponentViewLayout> extends ListGroupItemViewMixin(LinkViewMixin(BaseCompositeComponentView)) {
    static create<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new LinkListGroupItemView(layout, l => Object.assign({}, l)).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }
}

export class TextCompositeListGroupItemView<TLayout extends IComponentViewLayout, TPublicLayout extends BaseTextComponentView> extends ListGroupItemViewMixin(TextViewMixin(TitleViewMixin(BaseCompositeComponentView))) {
    static listItem<TLayout extends IComponentViewLayout, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextCompositeListGroupItemView("li", layout, toPublicLayout).asLayout();
    }

    static block<TLayout extends IComponentViewLayout, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new TextCompositeListGroupItemView("div", layout, toPublicLayout).asLayout();
    }

    constructor(tagName: string, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super(tagName, layout, toPublicLayout);
    }
}

export class TextListGroupItemView extends ListGroupItemViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView)))) {
    static block() {
        return new TextListGroupItemView("div");
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

export class GridListGroupItemView<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends GridRowViewMixin(ListGroupItemViewMixin(StyleableComponentViewMixin(BaseCompositeComponentView))) {
    static listItem<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return GridListGroupItemView.listItemWithPublicLayout(layout, l => l);
    }

    static listItemWithPublicLayout<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemView("li", layout, toPublicLayout).asLayout();
    }

    static block<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return GridListGroupItemView.blockWithPublicLayout(layout, l => l);
    }

    static blockWithPublicLayout<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridListGroupItemView("div", layout, toPublicLayout).asLayout();
    }

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}

export class GridLinkListGroupItemView<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends LinkViewMixin(GridRowViewMixin(ListGroupItemViewMixin(BaseCompositeComponentView))) {
    static create<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return GridLinkListGroupItemView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridLinkListGroupItemView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }

    setContext(context: ContextualClass) {
        this.setListGroupItemCss(css => css.context(context));
        this.setGridRowCss(css => css.context(context));
        return this;
    }
}
