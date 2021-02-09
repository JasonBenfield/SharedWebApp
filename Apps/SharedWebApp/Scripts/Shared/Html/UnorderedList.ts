import { BaseList } from "./BaseList";
import { ListItem } from "./ListItem";
import { ListItemViewModel } from "./ListItemViewModel";
import { UnorderedListViewModel } from "./UnorderedListViewModel";

export class UnorderedList extends BaseList {
    constructor(
        createItem: (itemVM: ListItemViewModel) => ListItem = null,
        createItemVM: () => ListItemViewModel = null,
        vm: UnorderedListViewModel = new UnorderedListViewModel()
    ) {
        super(
            createItem || ((itemVM: ListItemViewModel) => new ListItem(itemVM)),
            createItemVM || (() => new ListItemViewModel()),
            vm
        );
    }

    protected readonly vm: UnorderedListViewModel;
}