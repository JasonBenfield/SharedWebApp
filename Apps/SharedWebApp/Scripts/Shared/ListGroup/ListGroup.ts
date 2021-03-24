import { ListItemViewModel } from "../Html/ListItemViewModel";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { BaseListGroup } from "./BaseListGroup";
import { ListGroupItem } from "./ListGroupItem";

export class ListGroup extends BaseListGroup {
    constructor(
        createItem: (itemVM: ListItemViewModel) => ListGroupItem = null,
        createItemVM: () => ListItemViewModel = null,
        vm: UnorderedListViewModel = new UnorderedListViewModel()
    ) {
        super(
            createItem || ((itemVM: ListItemViewModel) => new ListGroupItem(itemVM)),
            createItemVM || (() => new ListItemViewModel()),
            vm
        );
    }
}