import { BaseListView } from "../ListGroup/BaseListView";
import { ListItem } from "./ListItem";
import { ListItemViewModel } from "./ListItemViewModel";
import { UnorderedListViewModel } from "./UnorderedListViewModel";

export class UnorderedList extends BaseListView {
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

    protected readonly vm: UnorderedListViewModel;
}