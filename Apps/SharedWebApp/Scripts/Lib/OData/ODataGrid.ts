import { BasicComponent } from "../Components/BasicComponent";
import { MessageAlert } from "../Components/MessageAlert";
import { MappedArray } from "../Enumerable";
import { EventSource } from "../Events";
import { BasicComponentView } from "../Views/BasicComponentView";
import { ODataCellClickedEventArgs } from "./ODataCellClickedEventArgs";
import { ODataColumn } from "./ODataColumn";
import { ODataGridView } from "./ODataGridView";
import { ODataHeaderRow } from "./ODataHeaderRow";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";
import { Queryable } from "./Types";

export class ODataGrid<TEntity> extends BasicComponent {
    protected readonly view: ODataGridView;

    private readonly _events = {
        headerCellClicked: null as ODataColumn,
        sortClicked: null as ODataColumn,
        dataCellClicked: null as ODataCellClickedEventArgs
    };
    private readonly eventSource = new EventSource<typeof this._events>(this, this._events);
    readonly when = this.eventSource.when;

    constructor(view: ODataGridView) {
        super(view);
        view.handleClick(this.onClick.bind(this));
    }

    private onClick(sourceView: BasicComponentView, sourceElement: HTMLElement) {
        const row = this.getComponentByElement(sourceElement) as ODataRow;
        if (row) {
            const cell = row.getCellByElement(sourceElement);
            if (cell) {
                if (cell.record) {
                    this.eventSource.events.dataCellClicked.invoke(
                        new ODataCellClickedEventArgs(cell.column, cell.record)
                    );
                }
                else if (sourceElement.classList.contains('odata-sort-button')) {
                    this.eventSource.events.sortClicked.invoke(cell.column);
                }
                else {
                    this.eventSource.events.headerCellClicked.invoke(cell.column);
                }
            }
        }
    }

    orderByChanged(orderBy: ODataQueryOrderByBuilder) {
        const headerRowView = this.getComponents()[0] as ODataHeaderRow;
        headerRowView.setOrderBy(orderBy);
    }

    clearData() { this.clearComponents(); }

    setData(columns: ODataColumn[], records: Queryable<TEntity>[]) {
        this.clearComponents();
        const columnViews = new MappedArray(
            columns,
            column => column.view
        ).value();
        this.view.setSelectedTemplateColumns(columnViews);
        const headerRowView = this.view.addHeaderRow(columnViews);
        const headerRow = new ODataHeaderRow(columns, headerRowView);
        this.addComponent(headerRow);
        if (records.length > 0) {
            let rowIndex = 1;
            for (const record of records) {
                const dataRowView = this.view.addDataRow(columnViews);
                const dataRow = new ODataRow(rowIndex, columns, record, dataRowView);
                this.addComponent(dataRow);
                rowIndex++;
            }
        }
        else {
            const alert = new MessageAlert(this.view.addAlertRow());
            alert.warning('No Records were found.');
        }
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}