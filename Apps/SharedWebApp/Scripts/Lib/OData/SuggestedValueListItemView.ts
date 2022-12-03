import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { FaIconView } from "../Views/FaIconView";
import { GridListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class SuggestedValueListItemView extends GridListGroupItemView {
    readonly valueText: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('clickable');
        this.valueText = this.addCell().addView(TextBlockView);
        const icon = this.addCell().addView(FaIconView);
        icon.solidStyle('plus');
    }
}