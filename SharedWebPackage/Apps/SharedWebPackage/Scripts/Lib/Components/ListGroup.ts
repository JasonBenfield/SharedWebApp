import { EventSource } from "../Events";
import { BasicListGroupItemView, BasicListGroupView, TextButtonListGroupItemView, TextLinkListGroupItemView, TextListGroupItemView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";
import { TextComponent } from "./TextComponent";

type Events<TItem> = {
    itemClicked: TItem,
    headerClicked: BasicComponent,
    footerClicked: BasicComponent
};

export interface IListGroupFactory<TItem extends BasicComponent, TItemView extends BasicListGroupItemView> {
    createItem: (sourceItem: any, itemView: TItemView) => TItem,
    createHeader?: (itemView: BasicListGroupItemView) => BasicComponent,
    createFooter?: (itemView: BasicListGroupItemView) => BasicComponent
}

export class ListGroup<TItem extends BasicComponent, TItemView extends BasicListGroupItemView> extends BasicComponent {
    protected readonly view: BasicListGroupView<TItemView>;
    private _header: BasicComponent;
    private _footer: BasicComponent;
    private readonly eventSource = new EventSource<Events<TItem>>(this, { itemClicked: null as TItem, headerClicked: null, footerClicked: null });
    private readonly _factory: IListGroupFactory<TItem, TItemView>;
    readonly when = this.eventSource.when;

    constructor(view: BasicListGroupView<TItemView>, factory?: IListGroupFactory<TItem, TItemView>) {
        super(view);
        view.handleClick(this.onItemClick.bind(this));
        this._factory = factory;
    }

    private onItemClick(el: HTMLElement) {
        const item = this.getItemByElement(el);
        if (item) {
            if (item === this._header) {
                this.eventSource.events.headerClicked.invoke(item);
            }
            else if (item === this._footer) {
                this.eventSource.events.footerClicked.invoke(item);
            }
            else {
                this.eventSource.events.itemClicked.invoke(item);
            }
        }
    }

    get header() { return this._header; }

    get footer() { return this._footer; }

    getItemByElement(element: HTMLElement) {
        return this.getComponentByElement(element) as TItem;
    }

    getItems() {
        const components = this.getComponents()
            .filter(c => c !== this._header && c !== this._footer);
        return components as TItem[];
    }

    setItems<TSourceItem>(
        sourceItems: TSourceItem[],
        createItem?: (sourceItem: TSourceItem, itemView: TItemView) => TItem
    ) {
        this.clearItems();
        if (this._factory) {
            if (!createItem) {
                createItem = this._factory.createItem;
            }
        }
        const items: TItem[] = [];
        if (this._factory && this._factory.createHeader) {
            const headerView = this.view.addListGroupHeader();
            const header = this._factory.createHeader(headerView);
            this._header = this.addComponent(header);
        }
        if (createItem) {
            for (const sourceItem of sourceItems) {
                const item = this.addItem<TSourceItem>(sourceItem, createItem);
                items.push(item);
            }
        }
        if (this._factory && this._factory.createFooter) {
            const footerView = this.view.addListGroupFooter();
            const footer = this._factory.createFooter(footerView);
            this._footer = this.addComponent(footer);
        }
        return items;
    }

    clearItems() {
        this.clearComponents();
        this._header = null;
        this._footer = null;
    }

    addItem<TSourceItem>(
        sourceItem: TSourceItem,
        createItem: (sourceItem: TSourceItem, itemView: TItemView) => TItem
    ) {
        const itemView = this.view.addListGroupItem();
        const item = createItem(sourceItem, itemView);
        this.addComponent(item);
        return item;
    }

    removeHeader() {
        if (this._header) {
            this.removeComponent(this._header);
            this._header = null;
        }
    }

    removeFooter() {
        if (this._footer) {
            this.removeComponent(this._footer);
            this._footer = null;
        }
    }

    removeItem(itemToRemove: BasicComponent) {
        this.removeComponent(itemToRemove);
    }

    moveItem(item: BasicComponent, destinationIndex: number) {
        this.moveComponent(item, destinationIndex)
    }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}

export class TextListItem extends BasicComponent {
    readonly text: TextComponent;

    constructor(value: string, protected readonly view: TextListGroupItemView | TextButtonListGroupItemView | TextLinkListGroupItemView) {
        super(view);
        this.text = this.addComponent(new TextComponent(view));
        this.text.setText(value);
    }

    makeActive() { this.view.active(); }

    makeNotActive() { this.view.notActive(); }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}