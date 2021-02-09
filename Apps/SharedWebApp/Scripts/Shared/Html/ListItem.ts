import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { ListItemViewModel } from "./ListItemViewModel";

export class ListItem extends HtmlContainerComponent implements IListItem {
    constructor(vm: IListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    protected readonly vm: IListItemViewModel;

    private data: any;

    getData<T>(): T { return this.data; }

    setData(data: any) { this.data = data; }

    addToList(list: IList) {
        list.addListItem(this.vm, this);
        return this;
    }
}