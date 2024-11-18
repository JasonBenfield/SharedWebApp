import { BasicComponent } from "../Components/BasicComponent";
import { FormGroupGridListGroupView } from "../Views/FormGroupGridListGroupView";
import { GridListGroupItemView } from "../Views/ListGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupGridListGroup<TItem extends BasicComponent, TItemView extends GridListGroupItemView> extends FormGroup {
    private readonly listItems: TItem[] = [];
    constructor(protected readonly view: FormGroupGridListGroupView<TItemView>) {
        super(view);
    }

    getItems() { return this.getComponents() as TItem[]; }

    setItems<TSourceItem>(
        sourceItems: TSourceItem[],
        createItem: (sourceItem: TSourceItem, itemView: TItemView) => TItem
    ) {
        this.clearItems();
        const items: TItem[] = [];
        for (const sourceItem of sourceItems) {
            const item = this.addItem<TSourceItem>(sourceItem, createItem);
            items.push(item);
        }
        return items;
    }

    clearItems() {
        for (const listItem of this.listItems) {
            listItem.dispose();
        }
        this.listItems.splice(0, this.listItems.length);
    }

    addItem<TSourceItem>(
        sourceItem: TSourceItem,
        createItem: (sourceItem: TSourceItem, itemView: TItemView) => TItem
    ) {
        const itemView = this.view.addListGroupItem();
        const item = createItem(sourceItem, itemView);
        this.addComponent(item);
        this.listItems.push(item);
        return item;
    }

    removeItem(itemToRemove: TItem) {
        this.removeComponent(itemToRemove);
        const index = this.listItems.indexOf(itemToRemove);
        if (index > -1) {
            this.listItems.splice(index, 1);
        }
    }

    moveItem(item: BasicComponent, destinationIndex: number) {
        this.moveComponent(item, destinationIndex);
    }
}