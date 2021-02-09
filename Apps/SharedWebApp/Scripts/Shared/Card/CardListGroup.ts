import { ListItemViewModel } from "../Html/ListItemViewModel";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { ListGroup } from "../ListGroup/ListGroup";
import { ListGroupItem } from "../ListGroup/ListGroupItem";

export class CardListGroup extends ListGroup {
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
        this.makeFlush();
    }
}