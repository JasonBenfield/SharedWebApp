import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Commands";
import { GridCellView, GridRowView } from "../Views/Grid";
import { TextBlockView } from "../Views/TextBlockView";

export class FilterConditionClauseView extends GridRowView {
    readonly condition: BasicTextComponentView;
    readonly deleteButton: ButtonCommandView;
    readonly conjunction: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.condition = this.addCell().addView(TextBlockView);
        this.deleteButton = this.addCell().addView(ButtonCommandView);
        this.deleteButton.icon.solidStyle('times');
        this.deleteButton.useOutlineStyle(ContextualClass.secondary);
        this.deleteButton.setTitle('Delete condition');
        this.conjunction = this.addCell().addView(TextBlockView);
    }
}