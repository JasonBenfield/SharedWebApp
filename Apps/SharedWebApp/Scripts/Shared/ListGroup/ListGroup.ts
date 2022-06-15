import _ = require("lodash");
import { FilteredArray, First } from "../Enumerable";
import { DefaultEvent } from "../Events";
import { ListItem } from "../Html/ListItem";
import { BaseListView } from "./BaseListView";

export class ListGroup {
    private readonly items: ListItem[] = [];

    private readonly _itemClicked = new DefaultEvent<ListItem>(this);
    readonly itemClicked = this._itemClicked.handler()

    constructor(private readonly view: BaseListView) {
        view.events.onClick(
            (source: IListItemView) => {
                let found = new First(
                    new FilteredArray(
                        this.items,
                        item => item.isView(source)
                    )
                ).value();
                this._itemClicked.invoke(found);
            },
            builder => builder.select('button,li,a')
        );
    }

    clearItems() {
        for (let item of this.items) {
            item.removeFromList(this.view);
        }
        this.items.splice(0, this.items.length);
    }

    removeItem(itemToRemove: ListItem) {
        itemToRemove.removeFromList(this.view);
        _(this.items).remove(item => item === itemToRemove);
    }

    addItem<TSourceItem, TItem extends ListItem>(
        sourceItem: TSourceItem,
        createItem: (sourceItem: TSourceItem, itemView: IListItemView) => TItem
    ) {
        let itemView = this.view.createItemView(sourceItem);
        let item = createItem(sourceItem, itemView);
        this.items.push(item);
        itemView.addToList(this.view);
        return item;
    }

    setItems<TSourceItem, TItem extends ListItem>(
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