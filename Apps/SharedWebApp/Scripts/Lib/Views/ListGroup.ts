import { ContextualClass } from "../ContextualClass";
import { MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { BasicComponentView } from "./BasicComponentView";
import { GridCellView, GridTemplateCss, GridView } from "./Grid";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class BasicListGroupView extends BasicComponentView {
    private clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder;
    private itemViewCtor: ViewConstructor<BasicListGroupItemView>;

    constructor(container: IContainerView, tagName: 'ul' | 'div') {
        super(HtmlElementView.fromTag(container, tagName));
        this.addCssName('list-group');
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (view: BasicListGroupItemView) => void) {
        this.clickConfig(this.on('click').execute(action)).subscribe();
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
    constructor(container: IContainerView, tagName: 'li' | 'button' | 'a' | 'div') {
        super(HtmlElementView.fromTag(container, tagName));
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
    constructor(container: IContainerView) {
        super(container, 'ul');
        this.configureClick(b => b.select('li'));
        this.setItemViewType(ListGroupItemView);
    }

    addListGroupItem: <T extends ListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends ListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
}

export class ListGroupItemView extends BasicListGroupItemView {
    constructor(container: IContainerView) {
        super(container, 'li');
    }
}

export class ButtonListGroupView extends BasicListGroupView {
    constructor(container: IContainerView) {
        super(container, 'div');
        this.configureClick(b => b.select('button'));
        this.setItemViewType(ButtonListGroupItemView);
    }

    addListGroupItem: <T extends ButtonListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends ButtonListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
}

export class ButtonListGroupItemView extends BasicListGroupItemView {
    constructor(container: IContainerView) {
        super(container, 'button');
    }
}

export class LinkListGroupView extends BasicListGroupView {
    constructor(container: IContainerView) {
        super(container, 'div');
        this.configureClick(b => b.select('a'));
        this.setItemViewType(LinkListGroupItemView);
    }

    addListGroupItem: <T extends LinkListGroupItemView>(ctor?: ViewConstructor<T>) => T;

    addListGroupItems: <T extends LinkListGroupItemView>(howMany: number, ctor?: ViewConstructor<T>) => T[];
}

export class LinkListGroupItemView extends BasicListGroupItemView {
    constructor(container: IContainerView) {
        super(container, 'a');
    }
}

export class GridListGroupView extends BasicListGroupView {
    constructor(container: IContainerView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-borderless');
        this.configureClick(b => b.select('.grid-cell'));
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

    constructor(container: IContainerView) {
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
