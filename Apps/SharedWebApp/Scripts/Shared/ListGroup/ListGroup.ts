import _ = require("lodash");
import { FilteredArray, First } from "../Enumerable";
import { DefaultEvent } from "../Events";
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

    private onItemClicked(itemView: IListItemView) {
        let item = new First(
            new FilteredArray(
                this.itemsWithView,
                itemWithView => itemWithView.view === itemView
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

    removeItem(item: any) {
        let foundItems = new FilteredArray(
            this.itemsWithView,
            itemWithView => itemWithView.listItem === item
        ).value();
        for (let foundItem of foundItems) {
            foundItem.view.removeFromList(this.view);
        }
        _(this.itemsWithView).remove(itemWithView => itemWithView.listItem === item);
    }

    addItem<TSourceItem, TItem>(
        sourceItem: TSourceItem,
        createItem: (sourceItem: TSourceItem, itemView: IListItemView) => TItem
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
            let item = this.addItem<TSourceItem, TItem>(sourceItem, createItem);
            items.push(item);
        }
        return items;
    }
}