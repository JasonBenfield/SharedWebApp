import { HtmlContainerComponent } from "./HtmlContainerComponent";
export declare class ListItem extends HtmlContainerComponent implements IListItemView {
    protected readonly vm: IListItemViewModel;
    constructor(vm?: IListItemViewModel);
    addToList(list: IListView): this;
    removeFromList(list: IListView): this;
}
