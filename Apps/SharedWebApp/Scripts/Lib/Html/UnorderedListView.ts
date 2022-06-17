import { BaseListView } from "../ListGroup/BaseListView";
import { ListItemView } from "./ListItemView";
import { ListItemViewModel } from "./ListItemViewModel";
import { UnorderedListViewModel } from "./UnorderedListViewModel";
import { ViewEvents } from "./ViewEvents";

export class UnorderedListView extends BaseListView {
    protected readonly vm: UnorderedListViewModel;

    constructor(
        createItemView: (source?: any) => IListItemView =
            ((itemVM: ListItemViewModel) => new ListItemView(itemVM)),
        vm: UnorderedListViewModel = new UnorderedListViewModel()
    ) {
        super(
            createItemView,
            vm
        );
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    addListItem() {
        return this.addListItemView(new ListItemView());
    }

}