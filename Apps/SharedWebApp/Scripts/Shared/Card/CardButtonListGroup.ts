import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { ButtonListGroup } from "../ListGroup/ButtonListGroup";
import { ButtonListGroupItem } from "../ListGroup/ButtonListGroupItem";
import { ButtonListItemViewModel } from "../ListGroup/ButtonListItemViewModel";

export class CardButtonListGroup extends ButtonListGroup {
    constructor(
        createItem: (itemVM: ButtonListItemViewModel) => ButtonListGroupItem = null,
        createItemVM: () => ButtonListItemViewModel = null,
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