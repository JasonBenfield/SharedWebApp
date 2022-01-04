import { LinkView } from "../Html/LinkView";
import { ListItem } from "../Html/ListItem";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class DropdownLinkItem extends ListItem {
    constructor(vm: ListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    readonly link = new LinkView().addToContainer(this)
        .configure(l => {
            l.addCssName('dropdown-item')
        });
}