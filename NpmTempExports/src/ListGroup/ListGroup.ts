import { FilteredArray, First } from "../Enumerable";
import { DefaultEvent } from "../Events";
import { ListItem } from "../Html/ListItem";
import { BaseListView } from "./BaseListView";

class ListItemWithView {
    constructor(readonly listItem: any, readonly view: IListItemView) {
    }
}

export class ListGroup {
    private readonly itemsWithView: ListItemWithView[] = [];

    private readonly _itemClicked = new DefaultEvent<any>(this);
    readonly itemClicked = this._itemClicked.handler()

    constructor(private readonly view: BaseListView) {
        this.view.itemClicked.register(this.onItemClicked.bind(this));
    }

    private onItemClicked(itemVM: IListItemView) {
        let item = new First(
            new FilteredArray(
                this.itemsWithView,
                itemWithView => itemWithView.view === itemVM
            )
        ).value();
        this._itemClicked.invoke(item && item.listItem);
    }

    clearItems() {
        for (let itemWithView of this.itemsWithView) {
            itemWithView.view.removeFromList(this.view);
        }
        this.itemsWithView.splice(0, this.itemsWithView.length);
    }

    addItem<TItem>(
        sourceItem: any,
        createItem: (sourceItem: any, itemView: IListItemView) => TItem
    ) {
        let itemView = this.view.createItemView(sourceItem);
        let item = createItem(sourceItem, itemView);
        this.itemsWithView.push(new ListItemWithView(item, itemView));
        itemView.addToList(this.view);
        return item;
    }

    setItems<TSourceItem, TItem>(
        sourceItems: TSourceItem[],
        createItem: (sourceItem: TSourceItem, itemView: IListItemView) => TItem
    ) {
        this.clearItems();
        let items: TItem[] = [];
        for (let sourceItem of sourceItems) {
            let item = this.addItem<TItem>(sourceItem, createItem);
            items.push(item);
        }
        return items;
    }
}