import { ListItem } from "../Html/ListItem";
import { UnorderedList } from "../Html/UnorderedList";
import { DropdownButton } from "./DropdownButton";
import { DropdownComponentViewModel } from "./DropdownComponentViewModel";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";

export class DropdownComponent implements IComponent {
    readonly button = new DropdownButton(this.vm.button);
    readonly menu = new UnorderedList(this.createItemView, this.vm.menu);

    constructor(
        private readonly createItemView: (source?: any) => IListItemView =
            (() => new ListItem()),
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