import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { ListItemViewModel } from "./ListItemViewModel";

export class ListItemView extends HtmlContainerComponent implements IListItemView {
    protected readonly vm: IListItemViewModel;

    constructor(vm: IListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    addToList(list: IListView) {
        list.addFromListItem(this.vm, this);
        return this;
    }

    removeFromList(list: IListView) {
        list.removeFromListItem(this.vm, this);
        return this;
    }
}