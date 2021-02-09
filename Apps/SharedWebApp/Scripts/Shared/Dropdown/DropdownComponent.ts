import { DropdownButton } from "./DropdownButton";
import { DropdownSpanItem } from "./DropdownSpanItem";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownComponentViewModel } from "./DropdownComponentViewModel";

export class DropdownComponent implements IComponent {
    constructor(
        private readonly vm: DropdownComponentViewModel = new DropdownComponentViewModel()
    ) {
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

    readonly button = new DropdownButton(this.vm.button);
    readonly menu = new DropdownMenu(null, null, this.vm.menu);

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