import { DefaultEvent } from "../Events";
import { BasicListGroupItemView, BasicListGroupView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";

export class ListGroupComponent extends BasicComponent {
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

    private handleClick(itemView: BasicListGroupItemView) {
        const item = this.getComponent(itemView);
        if (item) {
            this.itemClicked.invoke(item);
        }
    }

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
}