import { AggregateComponent } from "./AggregateComponent";
import { HtmlComponent } from "./HtmlComponent";

export class HtmlContainerComponent extends HtmlComponent implements IAggregateComponent {
    constructor(
        protected readonly vm: IHtmlContainerComponentViewModel,
        public readonly content: IAggregateComponent = new AggregateComponent(vm.content)
    ) {
        super(vm);
    }

    addContent<TItem extends IComponent>(item: TItem) {
        item.addToContainer(this.content);
        return item;
    }

    insertContent<TItem extends IComponent>(index: number, item: TItem) {
        item.insertIntoContainer(this.content, index);
        return item;
    }

    addItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(itemVM: TItemVM, item: TItem): TItem {
        return this.content.addItem(itemVM, item);
    }

    insertItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(index: number, itemVM: TItemVM, item: TItem): TItem {
        return this.content.insertItem(index, itemVM, item);
    }

    removeItem<TItem extends IComponent>(item: TItem) {
        return this.content.removeItem(item);
    }

    addToContainer(container: IAggregateComponent): this {
        return container.addItem(this.vm, this);
    }

    insertIntoContainer(container: IAggregateComponent, index: number): this {
        return container.insertItem(index, this.vm, this);
    }

    removeFromContainer(container: IAggregateComponent): this {
        return container.removeItem(this);
    }
}