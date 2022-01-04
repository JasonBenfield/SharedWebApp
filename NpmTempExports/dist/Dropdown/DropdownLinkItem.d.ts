import { LinkView } from "../Html/LinkView";
import { ListItem } from "../Html/ListItem";
import { ListItemViewModel } from "../Html/ListItemViewModel";
export declare class DropdownLinkItem extends ListItem {
    constructor(vm?: ListItemViewModel);
    readonly link: LinkView;
}
