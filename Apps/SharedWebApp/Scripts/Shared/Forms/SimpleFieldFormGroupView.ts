import { Alert } from "../Alert";
import { ContextualClass } from "../ContextualClass";
import { DropdownComponent } from "../Dropdown/DropdownComponent";
import { FaIcon } from "../FaIcon";
import { BlockViewModel } from "../Html/BlockViewModel";
import { FormGroupView } from "../Html/FormGroupView";
import { ListItem } from "../Html/ListItem";
import { ListGroupView } from "../ListGroup/ListGroupView";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { ErrorListItemView } from "./ErrorListItemView";

export class SimpleFieldFormGroupView extends FormGroupView {
    readonly alertList: ListGroupView;
    private readonly dropdown: DropdownComponent;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.dropdown = this.inputGroup.addContent(new DropdownComponent());
        this.dropdown.hide();
        this.dropdown.button.setContext(ContextualClass.danger);
        this.dropdown.button.useOutlineStyle();
        this.dropdown.button.addContent(new FaIcon('exclamation'))
            .configure(i => {
                i.solidStyle();
            });
        this.dropdown.menu.setPadding(PaddingCss.xs(0));
        let alertItem = new ListItem().addToList(this.dropdown.menu);
        alertItem.addCssName(ContextualClass.danger.append('border'));
        let alert = alertItem.addContent(new Alert());
        alert.setMargin(MarginCss.xs(0));
        alert.setContext(ContextualClass.danger);
        this.alertList = alert.addContent(new ListGroupView(() => new ErrorListItemView()));
    }

    showDropDown() { this.dropdown.show(); }

    hideDropDown() { this.dropdown.hide(); }
}