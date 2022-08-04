import { ContextualClass } from "../ContextualClass";
import { MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { GridCellView, GridTemplateCss } from "./Grid";
import { ILinkAttributes, ILinkView, ITextComponentView, ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class BasicListGroupView extends BasicComponentView {
    private itemViewCtor: ViewConstructor<BasicListGroupItemView>;

    constructor(container: BasicComponentView, tagName: 'ul' | 'div') {
        super(container, tagName);
        this.addCssName('list-group');
    }

    handleClick(action: (element: HTMLElement) => void) {
        this.on('click')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    setItemViewType(itemViewCtor: ViewConstructor<BasicListGroupItemView>) {
        this.itemViewCtor = itemViewCtor;
    }

    makeFlush() {
        this.addCssName('list-group-flush');
    }

    addListGroupItem() {
        return this.addListGroupItems(1)[0];
    }

    addListGroupItems(howMany: number) {
        const listItems: BasicListGroupItemView[] = [];
        for (let i = 0; i < howMany; i++) {
            const listItem = this.addView(this.itemViewCtor);
            listItems.push(listItem);
        }
        return listItems;
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

export class ListGroupView extends BasicListGroupView {
    constructor(container: BasicComponentView) {
        super(container, 'ul');
        this.setItemViewType(ListGroupItemView);
    }

    protected configureClick(b: ViewEventActionBuilder) {
        return b.select('li');
    }

    addListGroupItem: <T extends ListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends ListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
}

export class ListGroupItemView extends BasicListGroupItemView {
    constructor(container: BasicComponentView) {
        super(container, 'li');
    }

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;
}

export class TextListGroupItemView extends BasicListGroupItemView implements ITextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'li');
    }

    setText(text: string) { this.elementView.setText(text); }
}

export class ButtonListGroupView extends BasicListGroupView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.setItemViewType(ButtonListGroupItemView);
    }

    addListGroupItem: <T extends ButtonListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends ButtonListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
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

export class LinkListGroupView extends BasicListGroupView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.setItemViewType(LinkListGroupItemView);
    }

    addListGroupItem: <T extends LinkListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends LinkListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
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

export class GridListGroupView extends BasicListGroupView {
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

    addListGroupItem: <T extends GridListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends GridListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
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
