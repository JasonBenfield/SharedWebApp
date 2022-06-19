import { HtmlComponent } from "../Html/HtmlComponent";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { ViewEvents } from "../Html/ViewEvents";

export abstract class BaseListView extends HtmlComponent implements IListView {
    protected readonly vm: IListViewModel;
    readonly items: IListItemView[] = [];

    constructor(
        readonly createItemView: () => IListItemView,
        vm: IListViewModel = new UnorderedListViewModel()
    ) {
        super(vm);
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    addListItemViews(howMany: number, create: () => IListItemView) {
        let itemViews: IListItemView[] = [];
        for (let i = 0; i < howMany; i++) {
            let itemView = create();
            itemView.addToList(this);
            itemViews.push(itemView);
        }
        return itemViews;
    }

    addListItemView<T extends IListItemView>(itemView: T) {
        itemView.addToList(this);
        return itemView;
    }

    removeFromListItem(itemVM: IListItemViewModel, item: IListItemView) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        this.vm.items.remove(itemVM);
        this.vm.hasItems(this.items.length > 0);
    }

    addFromListItem(itemVM: IListItemViewModel, item: IListItemView) {
        this.vm.items.push(itemVM);
        this.vm.hasItems(true);
        this.items.push(item);
    }
}