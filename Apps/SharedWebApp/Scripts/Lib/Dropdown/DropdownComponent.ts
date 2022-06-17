import { ListItemView } from "../Html/ListItemView";
import { UnorderedListView } from "../Html/UnorderedListView";
import { DropdownButton } from "./DropdownButton";
import { DropdownComponentViewModel } from "./DropdownComponentViewModel";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";

export class DropdownComponent implements IComponent {
    readonly button = new DropdownButton(this.vm.button);
    readonly menu = new UnorderedListView(this.createItemView, this.vm.menu);

    constructor(
        private readonly createItemView: (source?: any) => IListItemView =
            (() => new ListItemView()),
        private readonly vm: DropdownComponentViewModel = new DropdownComponentViewModel()
    ) {
        this.menu.addCssName('dropdown-menu dropdown-menu-right');
    }

    addToContainer(container: IAggregateComponent) {
        return container.addItem(this.vm, this);
    }

    insertIntoContainer(container: IAggregateComponent, index: number) {
        return container.insertItem(index, this.vm, this);
    }

    removeFromContainer(container: IAggregateComponent) {
        return container.removeItem(this);
    }

    addSpanItem() {
        return new DropdownSpanItem().addToList(this.menu);
    }

    addLinkItem() {
        return new DropdownLinkItem().addToList(this.menu);
    }

    show() {
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }
}