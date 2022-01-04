import { Block } from "../Html/Block";
import { ListItem } from "../Html/ListItem";
import { UnorderedList } from "../Html/UnorderedList";
import { DropdownBlockViewModel } from "./DropdownBlockViewModel";
import { DropdownButton } from "./DropdownButton";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";

export class DropdownBlock extends Block {
    protected readonly vm: DropdownBlockViewModel;

    readonly button = this.addContent(new DropdownButton(this.vm.button));
    readonly menu = this.addContent(new UnorderedList(this.createItemView, this.vm.menu));

    constructor(
        private readonly createItemView: (source?: any) => IListItemView =
            (() => new ListItem()),
        vm: DropdownBlockViewModel = new DropdownBlockViewModel()) {
        super(vm);
        this.addCssName('dropdown');
        this.menu.addCssName('dropdown-menu dropdown-menu-right');
    }

    addSpanItem() {
        return new DropdownSpanItem().addToList(this.menu);
    }

    addLinkItem() {
        return new DropdownLinkItem().addToList(this.menu);
    }
}