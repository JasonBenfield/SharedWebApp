import { BaseListView } from "./BaseListView";
export declare class ListGroup {
    private readonly view;
    private readonly itemsWithView;
    private readonly _itemClicked;
    readonly itemClicked: import("../Events").DefaultEventHandler<any>;
    constructor(view: BaseListView);
    private onItemClicked;
    clearItems(): void;
    addItem<TItem>(sourceItem: any, createItem: (sourceItem: any, itemView: IListItemView) => TItem): TItem;
    setItems<TSourceItem, TItem>(sourceItems: TSourceItem[], createItem: (sourceItem: TSourceItem, itemView: IListItemView) => TItem): TItem[];
}
