import { Block } from "../Html/Block";
import { UnorderedList } from "../Html/UnorderedList";
import { DropdownBlockViewModel } from "./DropdownBlockViewModel";
import { DropdownButton } from "./DropdownButton";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";
export declare class DropdownBlock extends Block {
    private readonly createItemView;
    protected readonly vm: DropdownBlockViewModel;
    readonly button: DropdownButton;
    readonly menu: UnorderedList;
    constructor(createItemView?: (source?: any) => IListItemView, vm?: DropdownBlockViewModel);
    addSpanItem(): DropdownSpanItem;
    addLinkItem(): DropdownLinkItem;
}
