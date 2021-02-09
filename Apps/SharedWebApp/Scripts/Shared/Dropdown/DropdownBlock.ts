import { Block } from "../Html/Block";
import { DropdownButton } from "./DropdownButton";
import { DropdownSpanItem } from "./DropdownSpanItem";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownBlockViewModel } from "./DropdownBlockViewModel";

export class DropdownBlock extends Block {
    constructor(vm: DropdownBlockViewModel = new DropdownBlockViewModel()) {
        super(vm);
        this.addCssName('dropdown');
    }

    protected readonly vm: DropdownBlockViewModel;

    readonly button = this.addContent(new DropdownButton(this.vm.button));
    readonly menu = this.addContent(new DropdownMenu(null, null, this.vm.menu));

    addSpanItem() {
        return new DropdownSpanItem().addToList(this.menu);
    }

    addLinkItem() {
        return new DropdownLinkItem().addToList(this.menu);
    }
}