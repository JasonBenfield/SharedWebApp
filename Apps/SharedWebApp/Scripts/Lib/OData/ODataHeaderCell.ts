import { TextComponent } from "../Components/TextComponent";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataHeaderCellView } from "./ODataHeaderCellView";

export class ODataHeaderCell extends ODataCell {
    protected readonly view: ODataHeaderCellView;

    constructor(column: ODataColumn, view: ODataHeaderCellView) {
        super(0, column, null, view);
        const columnName = new TextComponent(view.columnName);
        columnName.setText(column ? column.displayText : '')
        columnName.syncTitleWithText();
    }

    sortNotSet() { this.view.sortNotSet(); }

    sortDesc() { this.view.sortDesc(); }

    sortAsc() { this.view.sortAsc(); }
}