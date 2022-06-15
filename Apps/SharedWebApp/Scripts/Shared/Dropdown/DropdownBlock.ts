import { Block } from "../Html/Block";
import { ListItemView } from "../Html/ListItemView";
import { UnorderedListView } from "../Html/UnorderedListView";
import { DropdownBlockViewModel } from "./DropdownBlockViewModel";
import { DropdownButton } from "./DropdownButton";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";

export class DropdownBlock extends Block {
    protected readonly vm: DropdownBlockViewModel;
    readonly button: DropdownButton;
    readonly menu: UnorderedListView;

    constructor(
        private readonly createItemView: (source?: any) => IListItemView =
            (() => new ListItemView()),
        vm: DropdownBlockViewModel = new DropdownBlockViewModel()
    ) {
        super(vm);
        this.addCssName('dropdown');
        this.button = this.addContent(new DropdownButton(this.vm.button));
        this.menu = this.addContent(new UnorderedListView(this.createItemView, this.vm.menu));
        this.menu.addCssName('dropdown-menu dropdown-menu-right');
    }

    addSpanItem() {
        return new DropdownSpanItem().addToList(this.menu);
    }

    addLinkItem() {
        return new DropdownLinkItem().addToList(this.menu);
    }
}