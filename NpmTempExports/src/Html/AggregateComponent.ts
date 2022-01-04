import { MappedArray } from "../Enumerable";

interface IComponentWithViewModel {
    readonly component: any;
    readonly vm: IComponentViewModel
}

export class AggregateComponent implements IAggregateComponent, IComponent {
    constructor(private readonly vm: IAggregateComponentViewModel) {
    }

    setName(name: string) {
        this.vm.name(name);
    }

    private readonly items: IComponent[] = [];

    configure(action: (c: this) => void) {
        action(this);
        return this;
    }

    addToContainer(container: IAggregateComponent) {
        for (let item of this.items) {
            item.addToContainer(container);
        }
        return this;
    }

    insertIntoContainer(container: IAggregateComponent, index: number) {
        for (let item of this.items) {
            item.insertIntoContainer(container, index);
            index++;
        }
        return this;
    }

    removeFromContainer(container: IAggregateComponent) {
        for (let item of this.items) {
            item.removeFromContainer(container);
        }
        return this;
    }

    clear() {
        this.items.splice(0, this.items.length);
        this.vm.items([]);
    }

    prependItem<TItem extends IComponent, TItemVM extends IComponentViewModel>(
        itemVM: TItemVM,
        create: (vm: TItemVM) => TItem
    ) {
        let item = create(itemVM);
        return this.insertItem(0, itemVM, item);
    }

    insertItemBefore<TItem extends IComponent>(otherItem: IComponent, item: TItem) {
        let index = this.indexOf(otherItem);
        return item.insertIntoContainer(this, index);
    }

    insertItemAfter<TItem extends IComponent>(otherItem: IComponent, item: TItem) {
        let index = this.indexOf(otherItem);
        return item.insertIntoContainer(this, index + 1);
    }

    moveItemBefore(sourceItem: IComponent, targetItem: IComponent) {
        this.removeItem(sourceItem);
        let targetIndex = this.indexOf(targetItem);
        return targetItem.insertIntoContainer(this, targetIndex);
    }

    moveItemAfter(sourceItem: IComponent, targetItem: IComponent) {
        this.removeItem(sourceItem);
        let targetIndex = this.indexOf(targetItem);
        return targetItem.insertIntoContainer(this, targetIndex + 1);
    }

    private indexOf(item: any) {
        for (let i = 0; i <= this.items.length; i++) {
            if (this.items[i] === item) {
                return i;
            }
        }
        return -1;
    }

    addContent<TItem extends IComponent>(item: TItem) {
        item.addToContainer(this);
        return item;
    }

    insertContent<TItem extends IComponent>(index: number, item: TItem) {
        item.insertIntoContainer(this, index);
        return item;
    }

    addItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(
        itemVM: TItemVM,
        item: TItem
    ) {
        return this.insertItem(this.items.length, itemVM, item);
    }

    insertItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(
        index: number,
        itemVM: TItemVM,
        item: TItem
    ) {
        this.splice(index, 0, { component: item, vm: itemVM });
        return item;
    }

    removeItem<TItem extends IComponent>(item: TItem) {
        let index = this.indexOf(item);
        this.splice(index, 1);
    }

    private splice(index: number, deleteCount: number, ...itemsToAdd: IComponentWithViewModel[]) {
        let itemVMs = new MappedArray(itemsToAdd, aggItem => aggItem.vm).value();
        this.vm.items.splice(index, deleteCount, ...itemVMs);
        let items = new MappedArray(itemsToAdd, aggItem => aggItem.component).value();
        this.items.splice(index, deleteCount, ...items);
    }

    show() { this.vm.isVisible(true); }

    hide() { this.vm.isVisible(false); }
}