import { Span } from "../Html/Span";
import { ListItemView } from "../Html/ListItemView";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class DropdownSpanItem extends ListItemView {
    constructor(vm: ListItemViewModel = new ListItemViewModel()) {
        super(vm);
    }

    readonly span = new Span().addToContainer(this)
        .configure(l => {
            l.addCssName('dropdown-item-text')
        });
}