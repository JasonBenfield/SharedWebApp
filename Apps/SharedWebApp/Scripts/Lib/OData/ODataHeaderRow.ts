import { GridRowView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";

export class ODataHeaderRow extends ODataRow {
    constructor(columns: ODataColumn[], view: GridRowView) {
        super(0, columns, null, view);
    }

    setOrderBy(orderBy: ODataQueryOrderByBuilder) {
        for (const cell of this.getComponents()) {
            if (cell instanceof ODataHeaderCell) {
                const orderByField = orderBy.getField(cell.column.columnName);
                if (orderByField) {
                    if (orderByField.isAscending) {
                        cell.sortAsc();
                    }
                    else {
                        cell.sortDesc();
                    }
                }
                else {
                    cell.sortNotSet();
                }
            }
        }
    }
}