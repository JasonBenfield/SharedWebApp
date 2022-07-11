import { DefaultEvent } from "../Events";
import { BasicListGroupItemView, BasicListGroupView } from "../Views/ListGroup";
import { BasicComponent } from "./BasicComponent";

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

    getItems() { return this.getComponents() as BasicComponent[]; }

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