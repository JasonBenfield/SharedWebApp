import { HtmlComponent } from "../Html/HtmlComponent";
export declare abstract class BaseListView extends HtmlComponent implements IListView {
    readonly createItemView: (source?: any) => IListItemView;
    protected readonly vm: IListViewModel;
    readonly items: IListItemView[];
    private readonly _itemClicked;
    readonly itemClicked: import("../Events").DefaultEventHandler<IListItemView>;
    constructor(createItemView: (source?: any) => IListItemView, vm?: IListViewModel);
    private onItemClicked;
    addItem(itemView: IListItemView): void;
    removeFromListItem(itemVM: IListItemViewModel, item: IListItemView): void;
    addFromListItem(itemVM: IListItemViewModel, item: IListItemView): void;
}
