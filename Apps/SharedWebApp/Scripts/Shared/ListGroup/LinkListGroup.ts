import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { BaseListGroup } from "./BaseListGroup";
import { LinkListGroupItem } from "./LinkListGroupItem";
import { LinkListItemViewModel } from "./LinkListItemViewModel";
import { ListGroupItem } from "./ListGroupItem";

export class LinkListGroup extends BaseListGroup {
    constructor(
        createItem: (itemVM: LinkListItemViewModel) => LinkListGroupItem = null,
        createItemVM: () => LinkListItemViewModel = null,
        vm: ListBlockViewModel = new ListBlockViewModel()
    ) {
        super(
            createItem || ((itemVM: LinkListItemViewModel) => new LinkListGroupItem(itemVM)),
            createItemVM || (() => new LinkListItemViewModel()),
            vm
        );
    }
    
    setItems: <TSourceItem>(
        sourceItems: TSourceItem[],
        config: (sourceItem: TSourceItem, listItem: LinkListGroupItem) => void
    ) => void;
}