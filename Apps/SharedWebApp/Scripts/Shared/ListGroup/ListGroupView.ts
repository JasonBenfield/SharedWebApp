import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { BaseListGroupView } from "./BaseListGroupView";
import { ButtonListGroupItemView } from "./ButtonListGroupItemView";
import { LinkListGroupItemView } from "./LinkListGroupItemView";
import { ListGroupItemView } from "./ListGroupItemView";

export class ListGroupView extends BaseListGroupView {
    constructor(
        createItemView: (source?: any) => IListItemView,
        vm: IListViewModel = new UnorderedListViewModel()
    ) {
        super(createItemView, vm);
    }

    addButtonListGroupItem() {
        return this.addListItemView(new ButtonListGroupItemView());
    }

    addLinkListGroupItem() {
        return this.addListItemView(new LinkListGroupItemView());
    }

    addListGroupItem() {
        return this.addListItemView(new ListGroupItemView());
    }
}