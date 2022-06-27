import { BasicComponent } from "../Components/BasicComponent";
import { EventSource } from '../Events';
import { GridCellView } from "../Views/Grid";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataHeaderRowView } from "./ODataHeaderRowView";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";

export class ODataHeaderRow extends BasicComponent {
    private readonly cells: ODataCell[] = [];
    private readonly events = {
        sortClicked: null as ODataColumn,
        filterClicked: null as ODataColumn
    };
    private readonly eventSource = new EventSource<typeof this.events>(this, this.events);
    readonly when = this.eventSource.when;

    constructor(columns: ODataColumn[], view: ODataHeaderRowView) {
        super(view);
        let i = 0;
        for (const column of columns) {
            const cell = column.createHeaderCell(view.cell(i));
            this.cells.push(cell);
            i++;
        }
        view.when.sortClicked.then(this.onSortClicked.bind(this));
        view.when.filterClicked.then(this.onFilterClicked.bind(this));
    }

    private onSortClicked(source: GridCellView) {
        const odataCell = this.getComponent(source);
        if (odataCell && odataCell instanceof ODataCell) {
            this.eventSource.events.sortClicked.invoke(odataCell.column);
        }
    }

    private onFilterClicked(source: GridCellView) {
        const odataCell = this.getComponent(source);
        if (odataCell && odataCell instanceof ODataCell) {
            this.eventSource.events.filterClicked.invoke(odataCell.column);
        }
    }

    setOrderBy(orderBy: ODataQueryOrderByBuilder) {
        for (const cell of this.cells) {
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