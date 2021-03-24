import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { LinkListGroup } from "../ListGroup/LinkListGroup";
import { LinkListGroupItem } from "../ListGroup/LinkListGroupItem";
import { LinkListItemViewModel } from "../ListGroup/LinkListItemViewModel";

export class CardLinkListGroup extends LinkListGroup {
    constructor(
        createItem: (itemVM: LinkListItemViewModel) => LinkListGroupItem = null,
        createItemVM: () => LinkListItemViewModel = null,
        vm: ListBlockViewModel = new ListBlockViewModel()
    ) {
        super(
            createItem,
            createItemVM,
            vm
        );
        this.makeFlush();
    }
}