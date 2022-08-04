import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Command";
import { GridListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class SuggestedValueListItemView extends GridListGroupItemView {
    readonly valueText: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.valueText = this.addCell().addView(TextBlockView);
        const addButton = this.addCell().addView(ButtonCommandView);
        addButton.icon.solidStyle('plus');
        addButton.setContext(ContextualClass.secondary);
        addButton.setTitle('Add Suggested Value');
        addButton.addCssName('addButton');
    }
}