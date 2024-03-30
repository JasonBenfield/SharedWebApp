import { EventSource } from "../Events";
import { BasicListGroupItemView, BasicListGroupView, TextButtonListGroupItemView, TextLinkListGroupItemView, TextListGroupItemView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";
import { TextComponent } from "./TextComponent";

type Events<TItem> = { itemClicked: TItem };

export class ListGroup<TItem extends BasicComponent, TItemView extends BasicListGroupItemView> extends BasicComponent {
    protected readonly view: BasicListGroupView<TItemView>;
    private readonly eventSource = new EventSource<Events<TItem>>(this, { itemClicked: null as TItem });
    readonly when = this.eventSource.when;

    constructor(view: BasicListGroupView<TItemView>) {
        super(view);
        view.handleClick(this.onItemClick.bind(this));
    }

    private onItemClick(el: HTMLElement, evt: JQuery.Event) {
        const item = this.getItemByElement(el);
        if (item) {
            this.eventSource.events.itemClicked.invoke(item);
        }
    }

    getItemByElement(element: HTMLElement) {
        return this.getComponentByElement(element) as TItem;
    }

    getItems() { return this.getComponents() as TItem[]; }

    setItems<TSourceItem>(
        sourceItems: TSourceItem[],
        createItem: (sourceItem: TSourceItem, itemView: TItemView) => TItem
    ) {
        this.clearItems();
        const items: TItem[] = [];
        for (const sourceItem of sourceItems) {
            const item = this.addItem<TSourceItem>(sourceItem, createItem);
            items.push(item);
        }
        return items;
    }

    clearItems() {
        this.clearComponents();
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

    removeItem(itemToRemove: BasicComponent) {
        this.removeComponent(itemToRemove);
    }

    moveItem(item: BasicComponent, destinationIndex: number) {
        this.moveComponent(item, destinationIndex)
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