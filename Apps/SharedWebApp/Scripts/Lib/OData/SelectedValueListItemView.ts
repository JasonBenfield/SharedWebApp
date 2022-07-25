import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Command";
import { GridListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class SelectedValueListItemView extends GridListGroupItemView {
    readonly valueText: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.valueText = this.addCell().addView(TextBlockView);
        const deleteButton = this.addCell().addView(ButtonCommandView);
        deleteButton.icon.solidStyle('times');
        deleteButton.setContext(ContextualClass.secondary);
        deleteButton.setTitle('Removed Selected Value');
        deleteButton.addCssName('deleteButton');
    }
}