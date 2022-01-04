import { BaseListView } from "./BaseListView";

export abstract class BaseListGroupView extends BaseListView {
    constructor(
        createItemView: (source?: any) => IListItemView,
        vm: IListViewModel
    ) {
        super(createItemView, vm);
        this.addCssName('list-group');
    }

    makeFlush() {
        this.addCssName('list-group-flush');
    }
}