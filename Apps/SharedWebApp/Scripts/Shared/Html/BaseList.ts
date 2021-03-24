import { MappedArray } from "../Enumerable";
import { DefaultEvent } from "../Events";
import { HtmlComponent } from "./HtmlComponent";

export class BaseList extends HtmlComponent implements IList {
    constructor(
        private readonly createItem: (itemVM: IListItemViewModel) => IListItem,
        private readonly createItemVM: () => IListItemViewModel,
        vm: IListViewModel
    ) {
        super(vm);
        this.vm.itemClicked.register(this.onItemClicked.bind(this));
    }

    private onItemClicked(itemVM: IListItemViewModel) {
        let index = this.vm.items.indexOf(itemVM);
        if (index >= 0) {
            this._itemClicked.invoke(this.items[index]);
        }
    }

    protected readonly vm: IListViewModel;
    readonly items: IListItem[] = [];

    private readonly _itemClicked = new DefaultEvent<IListItem>(this);
    readonly itemClicked = this._itemClicked.handler()

    clear() {
        this.items.splice(0, this.items.length);
        this.vm.items([]);
        this.vm.hasItems(false);
    }

    addItem() {
        let itemVM = this.createItemVM();
        return this.add(itemVM, this.createItem);
    }

    add<TListItem extends IListItem>(
        itemVM: IListItemViewModel,
        create: (vm: IListItemViewModel) => TListItem
    ) {
        return this.addListItem(itemVM, create(itemVM));
    }

    addListItem<TListItem extends IListItem>(itemVM: IListItemViewModel, item: TListItem) {
        this.vm.items.push(itemVM);
        this.vm.hasItems(true);
        this.items.push(item);
        return item;
    }

    setItems<TSourceItem>(
        sourceItems: TSourceItem[],
        config: (sourceItem: TSourceItem, listItem: IListItem) => void
    ) {
        let itemVMs: IListItemViewModel[] = [];
        let items = new MappedArray(
            sourceItems,
            sourceItem => {
                let itemVM = this.createItemVM();
                itemVMs.push(itemVM);
                let item = this.createItem(itemVM);
                config(sourceItem, item);
                return item;
            }
        ).value();
        this.items.splice(0, this.items.length, ...items);
        this.vm.items(itemVMs);
        this.vm.hasItems(itemVMs.length > 0);
    }
}