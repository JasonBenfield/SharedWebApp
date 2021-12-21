import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { ListItemViewModel } from "./ListItemViewModel";

export class ListItem extends HtmlContainerComponent implements IListItemView {
    protected readonly vm: IListItemViewModel;

    private data: any;

    constructor(vm: IListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    getData<T>(): T { return this.data; }

    setData(data: any) { this.data = data; }

    addToList(list: IListView) {
        list.addFromListItem(this.vm, this);
        return this;
    }

    removeFromList(list: IListView) {
        list.removeFromListItem(this.vm, this);
        return this;
    }
}