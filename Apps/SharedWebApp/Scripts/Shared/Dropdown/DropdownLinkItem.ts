import { LinkView } from "../Html/LinkView";
import { ListItemView } from "../Html/ListItemView";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class DropdownLinkItem extends ListItemView {
    constructor(vm: ListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    readonly link = new LinkView().addToContainer(this)
        .configure(l => {
            l.addCssName('dropdown-item')
        });
}