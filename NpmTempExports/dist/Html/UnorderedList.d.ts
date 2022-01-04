import { BaseListView } from "../ListGroup/BaseListView";
import { UnorderedListViewModel } from "./UnorderedListViewModel";
export declare class UnorderedList extends BaseListView {
    constructor(createItemView?: (source?: any) => IListItemView, vm?: UnorderedListViewModel);
    protected readonly vm: UnorderedListViewModel;
}
