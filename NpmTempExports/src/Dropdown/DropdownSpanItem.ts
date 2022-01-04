import { Span } from "../Html/Span";
import { ListItem } from "../Html/ListItem";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class DropdownSpanItem extends ListItem {
    constructor(vm: ListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    readonly span = new Span().addToContainer(this)
        .configure(l => {
            l.addCssName('dropdown-item-text')
        });
}