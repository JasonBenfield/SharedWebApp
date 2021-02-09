import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { BaseListGroup } from "./BaseListGroup";
import { ButtonListGroupItem } from "./ButtonListGroupItem";
import { ButtonListItemViewModel } from "./ButtonListItemViewModel";

export class ButtonListGroup extends BaseListGroup {
    constructor(
        createItem: (itemVM: ButtonListItemViewModel) => ButtonListGroupItem = null,
        createItemVM: () => ButtonListItemViewModel = null,
        vm: ListBlockViewModel = new ListBlockViewModel()
    ) {
        super(
            createItem || ((itemVM: ButtonListItemViewModel) => new ButtonListGroupItem(itemVM)),
            createItemVM || (() => new ButtonListItemViewModel()),
            vm
        );
    }
}