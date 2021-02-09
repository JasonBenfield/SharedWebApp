import { BaseList } from "../Html/BaseList";
import { ListGroupItem } from "./ListGroupItem";

export class BaseListGroup extends BaseList {
    constructor(
        createItem: (itemVM: IListItemViewModel) => ListGroupItem,
        createItemVM: () => IListItemViewModel,
        vm: IListViewModel
    ) {
        super(
            createItem,
            createItemVM,
            vm
        );
        this.addCssName('list-group');
    }

    makeFlush() {
        this.addCssName('list-group-flush');
    }
}