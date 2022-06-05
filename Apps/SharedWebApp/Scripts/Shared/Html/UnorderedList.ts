import { BaseListView } from "../ListGroup/BaseListView";
import { ListItem } from "./ListItem";
import { ListItemViewModel } from "./ListItemViewModel";
import { UnorderedListViewModel } from "./UnorderedListViewModel";

export class UnorderedList extends BaseListView {
    protected readonly vm: UnorderedListViewModel;

    constructor(
        createItemView: (source?: any) => IListItemView =
            ((itemVM: ListItemViewModel) => new ListItem(itemVM)),
        vm: UnorderedListViewModel = new UnorderedListViewModel()
    ) {
        super(
            createItemView,
            vm
        );
    }

    defaultClick() {
        this.vm.defaultClick();
    }

    overrideDefaultClick() {
        this.vm.overrideDefaultClick();
    }

    addListItem() {
        return this.addListItemView(new ListItem());
    }

}