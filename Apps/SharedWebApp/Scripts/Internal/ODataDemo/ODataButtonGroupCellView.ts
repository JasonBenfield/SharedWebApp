import { ContextualClass } from "../../Lib/ContextualClass";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { ButtonGroupView } from "../../Lib/Views/ButtonGroupView";
import { FaIconView } from "../../Lib/Views/FaIconView";
import { GridCellView } from "../../Lib/Views/Grid";

export class ODataButtonGroupCellView extends GridCellView {

    constructor(container: BasicComponentView) {
        super(container);
        const btnGroup = this.addView(ButtonGroupView);
        const editButton = btnGroup.addButton();
        editButton.addCssName('editButton');
        editButton.useOutlineStyle(ContextualClass.primary);
        editButton.addView(FaIconView)
            .configure(b => b.solidStyle('edit'));
        const deleteButton = btnGroup.addButton();
        deleteButton.addCssName('deleteButton');
        deleteButton.useOutlineStyle(ContextualClass.danger);
        deleteButton.addView(FaIconView)
            .configure(b => b.solidStyle('times'));
    }
}