import { DefaultEvent } from "../Events";
import { BasicListGroupItemView, BasicListGroupView, TextButtonListGroupItemView, TextLinkListGroupItemView, TextListGroupItemView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";
import { TextComponent } from "./TextComponent";

export class ListGroup extends BasicComponent {
    protected readonly view: BasicListGroupView;
    private itemClicked: DefaultEvent<BasicComponent>;

    constructor(view: BasicListGroupView) {
        super(view);
    }

    registerItemClicked(action: (item: BasicComponent) => void) {
        if (!this.itemClicked) {
            this.itemClicked = new DefaultEvent<BasicComponent>(this);
            this.view.handleClick(this.handleClick.bind(this));
        }
        this.itemClicked.register(action);
    }

    private handleClick(el: HTMLElement) {
        const item = this.getComponentByElement(el);
        if (item) {
            this.itemClicked.invoke(item);
        }
    }

    getItemByElement(element: HTMLElement) {
        return this.getComponentByElement(element);
    }

    getItems() { return this.getComponents(); }

    setItems<TSourceItem, TItem extends BasicComponent>(
        sourceItems: TSourceItem[],
        createItem: (sourceItem: TSourceItem, itemView: BasicListGroupItemView) => TItem
    ) {
        this.clearItems();
        const items: TItem[] = [];
        for (const sourceItem of sourceItems) {
            const item = this.addItem<TSourceItem, TItem>(sourceItem, createItem);
            items.push(item);
        }
        return items;
    }

    clearItems() {
        this.clearComponents();
    }

    addItem<TSourceItem, TItem extends BasicComponent>(
        sourceItem: TSourceItem,
        createItem: (sourceItem: TSourceItem, itemView: BasicListGroupItemView) => TItem
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

    constructor(protected readonly view: TextListGroupItemView | TextButtonListGroupItemView | TextLinkListGroupItemView) {
        super(view);
        this.text = this.addComponent(new TextComponent(view));
    }

    makeActive() { this.view.active(); }

    makeNotActive() { this.view.notActive(); }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}