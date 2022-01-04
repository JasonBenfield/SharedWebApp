import { BaseListView } from "./BaseListView";
export declare abstract class BaseListGroupView extends BaseListView {
    constructor(createItemView: (source?: any) => IListItemView, vm: IListViewModel);
    makeFlush(): void;
}
