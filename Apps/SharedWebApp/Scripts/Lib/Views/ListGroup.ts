import { ContextualClass } from "../ContextualClass";
import { MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { GridCellView, GridTemplateCss } from "./Grid";
import { IContainerView, ILinkAttributes, ILinkView, ITextComponentView, ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class BasicListGroupView<TItemView extends BasicListGroupItemView> extends BasicComponentView {
    private itemViewCtor: ViewConstructor<TItemView>;

    protected constructor(container: BasicComponentView, tagName: 'ul' | 'div') {
        super(container, tagName);
        this.addCssName('list-group');
    }

    handleClick(action: (element: HTMLElement) => void) {
        this.on('click')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    protected setItemViewType(itemViewCtor: ViewConstructor<BasicListGroupItemView>) {
        this.itemViewCtor = itemViewCtor as ViewConstructor<TItemView>;
    }

    makeFlush() {
        this.addCssName('list-group-flush');
    }

    insertListGroupItem(index: number) {
        return this.insertView(index, this.itemViewCtor);
    }

    addListGroupItem() {
        return this.addListGroupItems(1)[0];
    }

    addListGroupItems(howMany: number) {
        return this.addViews(howMany, this.itemViewCtor);
    }
}

export class BasicListGroupItemView extends BasicComponentView {
    constructor(container: BasicComponentView, tagName: 'li' | 'button' | 'a' | 'div') {
        super(container, tagName);
        this.addCssName('list-group-item');
    }

    setContext(context: ContextualClass) {
        this.setCss('list-group-item-context', context.append('list-group-item'));
    }

    active() {
        this.addCssName('active');
    }

    notActive() {
        this.removeCssName('active');
    }
}

export class ListGroupView<TItemView extends ListGroupItemView> extends BasicListGroupView<TItemView> {
    static addTo<T extends ListGroupItemView>(container: IContainerView, itemCtor: ViewConstructor<T>) {
        const listGroup = container.addView(ListGroupView<T>);
        listGroup.setItemViewType(itemCtor);
        return listGroup;
    }

    constructor(container: BasicComponentView) {
        super(container, 'ul');
        this.setItemViewType(ListGroupItemView);
    }

    protected configureClick(b: ViewEventActionBuilder) {
        return b.select('li');
    }

    addListGroupItem: (ctor?: ViewConstructor<TItemView>) => TItemView;

    addListGroupItems: (howMany: number, ctor?: ViewConstructor<TItemView>) => TItemView[];
}

export class ListGroupItemView extends BasicListGroupItemView {
    constructor(container: BasicComponentView) {
        super(container, 'li');
    }

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;
}

export class TextListGroupItemView extends ListGroupItemView implements ITextComponentView {
    constructor(container: BasicComponentView) {
        super(container);
    }

    setText(text: string) { this.elementView.setText(text); }
}

export class ButtonListGroupView<TItemView extends (ButtonListGroupItemView | TextButtonListGroupItemView)> extends BasicListGroupView<TItemView> {
    static addTo<T extends (ButtonListGroupItemView | TextButtonListGroupItemView)>(container: IContainerView, itemCtor: ViewConstructor<T>) {
        const listGroup = container.addView(ButtonListGroupView<T>);
        listGroup.setItemViewType(itemCtor);
        return listGroup;
    }

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.setItemViewType(ButtonListGroupItemView);
    }

    addListGroupItem: (ctor?: ViewConstructor<TItemView>) => TItemView;

    addListGroupItems: (howMany: number, ctor?: ViewConstructor<TItemView>) => TItemView[];
}

export class ButtonListGroupItemView extends BasicListGroupItemView {
    constructor(container: BasicComponentView) {
        super(container, 'button');
        this.setTextCss(new TextCss().start());
    }

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;
}

export class TextButtonListGroupItemView extends BasicListGroupItemView implements ITextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'button');
        this.setTextCss(new TextCss().start());
    }

    setText(text: string) { this.elementView.setText(text); }
}

export class LinkListGroupView<TItemView extends (BasicListGroupItemView & ILinkView)> extends BasicListGroupView<TItemView> {
    static addTo<T extends (BasicListGroupItemView & ILinkView)>(container: IContainerView, itemCtor: ViewConstructor<T>) {
        const listGroup = container.addView(LinkListGroupView<T>);
        listGroup.setItemViewType(itemCtor);
        return listGroup;
    }

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.setItemViewType(LinkListGroupItemView);
    }

    addListGroupItem: (ctor?: ViewConstructor<TItemView>) => TItemView;

    addListGroupItems: (howMany: number, ctor?: ViewConstructor<TItemView>) => TItemView[];
}

export class LinkListGroupItemView extends BasicListGroupItemView implements ILinkView {
    constructor(container: BasicComponentView) {
        super(container, 'a');
    }

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }
}

export class TextLinkListGroupItemView extends BasicListGroupItemView implements ILinkView, ITextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'a');
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    setText(text: string) { this.elementView.setText(text); }
}

export class GridListGroupView<TItemView extends GridListGroupItemView> extends BasicListGroupView<TItemView> {
    static addTo<T extends GridListGroupItemView>(container: IContainerView, itemCtor: ViewConstructor<T>) {
        const listGroup = container.addView(GridListGroupView<T>);
        listGroup.setItemViewType(itemCtor);
        return listGroup;
    }

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-borderless');
        this.setItemViewType(GridListGroupItemView);
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new JoinedStrings(
            ' ',
            new MappedArray(
                columns,
                c => c.toString()
            )
        ).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

    addListGroupItem: (ctor?: ViewConstructor<TItemView>) => TItemView;

    addListGroupItems: (howMany: number, ctor?: ViewConstructor<TItemView>) => TItemView[];
}

export class GridListGroupItemView extends BasicListGroupItemView {
    private readonly cells: GridCellView[] = [];

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('d-contents');
    }

    addCell<TView extends GridCellView>(ctor?: ViewConstructor<TView>) {
        return this.addCells(1, ctor)[0];
    }

    addCells<TView extends GridCellView>(howMany: number, ctor?: ViewConstructor<TView>) {
        return this.addViews(howMany, ctor || GridCellView);
    }

    cell(index: number) { return this.cells[index]; }

    getCells() { return this.cells; }
}
