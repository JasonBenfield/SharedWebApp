import { BasicComponent } from "../Components/BasicComponent";
import { TextComponent } from "../Components/TextComponent";
import { ODataColumn } from "./ODataColumn";
import { AvailableFieldListItemView } from "./AvailableFieldListItemView";

export class AvailableFieldListItem extends BasicComponent {
    protected readonly view: AvailableFieldListItemView;

    constructor(readonly column: ODataColumn, view: AvailableFieldListItemView) {
        super(view);
        new TextComponent(view.fieldName).setText(column.displayText);
    }
}