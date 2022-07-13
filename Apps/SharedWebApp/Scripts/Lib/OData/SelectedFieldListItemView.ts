import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Commands";
import { FaIconView } from "../Views/FaIconView";
import { GridListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class SelectedFieldListItemView extends GridListGroupItemView {
    readonly fieldName: BasicTextComponentView;
    readonly deleteButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCell()
            .configure(c => c.makeDraggable())
            .addView(FaIconView)
            .configure(ico => ico.solidStyle('grip'));
        this.fieldName = this.addCell().addView(TextBlockView);
        this.deleteButton = this.addCell()
            .addView(ButtonCommandView);
        this.deleteButton.icon.solidStyle('times');
        this.deleteButton.addCssName('deleteButton');
        this.deleteButton.setTitle('Remove Column');
    }

    styleAsDragStart() {
        this.setOpacity(0.4);
    }

    styleAsDragEnd() {
        this.resetOpacity();
    }
}