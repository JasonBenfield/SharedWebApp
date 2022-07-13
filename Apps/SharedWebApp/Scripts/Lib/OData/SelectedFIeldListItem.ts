import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { ODataColumn } from "./ODataColumn";
import { SelectedFieldListItemView } from "./SelectedFieldListItemView";

export class SelectedFieldListItem extends BasicComponent {
    protected readonly view: SelectedFieldListItemView;

    constructor(readonly column: ODataColumn, view: SelectedFieldListItemView) {
        super(view);
        new TextComponent(view.fieldName).setText(column.displayText);
    }

    styleAsDragStart() {
        this.view.styleAsDragStart();
    }

    styleAsDragEnd() {
        this.view.styleAsDragEnd();
    }
}