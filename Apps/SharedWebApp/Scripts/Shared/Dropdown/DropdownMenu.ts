import { ListItem } from "../Html/ListItem";
import { ListItemViewModel } from "../Html/ListItemViewModel";
import { UnorderedList } from "../Html/UnorderedList";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";

export class DropdownMenu extends UnorderedList {
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
        this.addCssName('dropdown-menu dropdown-menu-right');
    }
}