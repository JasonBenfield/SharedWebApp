import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { BaseListGroupView } from "./BaseListGroupView";

export class ListGroupView extends BaseListGroupView {
    constructor(
        createItemView: (source?: any) => IListItemView,
        vm: IListViewModel = new UnorderedListViewModel()
    ) {
        super(createItemView, vm);
    }
}