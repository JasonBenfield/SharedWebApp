import { DefaultEvent } from "../Events";
import { HtmlComponent } from "../Html/HtmlComponent";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";

export abstract class BaseListView extends HtmlComponent implements IListView {
    protected readonly vm: IListViewModel;
    readonly items: IListItemView[] = [];

    private readonly _itemClicked = new DefaultEvent<IListItemView>(this);
    readonly itemClicked = this._itemClicked.handler()

    constructor(
        readonly createItemView: (source?: any) => IListItemView,
        vm: IListViewModel = new UnorderedListViewModel()
    ) {
        super(vm);
        this.vm.itemClicked.register(this.onItemClicked.bind(this));
    }

    defaultClick() { this.vm.defaultClick(); }

    overrideDefaultClick() { this.vm.overrideDefaultClick(); }

    private onItemClicked(itemVM: IListItemViewModel) {
        let index = this.vm.items.indexOf(itemVM);
        if (index >= 0) {
            this._itemClicked.invoke(this.items[index]);
        }
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