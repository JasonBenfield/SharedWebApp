import { BasicComponent } from "../Components/BasicComponent";
import { MessageAlert } from "../Components/MessageAlert";
import { EventSource } from "../Events";
import { BasicGridRowView } from "../Views/Grid";
import { ODataCellClickedEventArgs } from "./ODataCellClickedEventArgs";
import { ODataColumn } from "./ODataColumn";
import { ODataGridView } from "./ODataGridView";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataHeaderRow } from "./ODataHeaderRow";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";
import { ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { ODataRow } from "./ODataRow";
import { Queryable } from "./Types";

type Events = {
    headerCellClicked: ODataColumn;
    sortClicked: ODataColumn;
    dataCellClicked: ODataCellClickedEventArgs;
    headerCellDropped: HeaderCellDroppedEventArgs;
};

export class HeaderCellDroppedEventArgs {
    constructor(readonly source: string, readonly destination: string) {
    }
}

export class ODataGrid<TEntity> extends BasicComponent {
    protected readonly view: ODataGridView;
    private readonly eventSource = new EventSource<Events>(
        this,
        {
            headerCellClicked: null as ODataColumn,
            sortClicked: null as ODataColumn,
            dataCellClicked: null as ODataCellClickedEventArgs,
            headerCellDropped: null as HeaderCellDroppedEventArgs
        }
    );
    readonly when = this.eventSource.when;
    private dragStartCell: ODataHeaderCell;
    private dragEnterCell: ODataHeaderCell;

    constructor(
        view: ODataGridView,
        private readonly createDataRow: (rowIndex: number, columns: ODataColumn[], record: any, view: BasicGridRowView) => ODataRow
    ) {
        super(view);
        view.on('dragstart')
            .select('.grid-header')
            .execute(this.onDragStart.bind(this))
            .subscribe();
        view.on('dragend')
            .select('.grid-header')
            .execute(this.onDragEnd.bind(this))
            .subscribe();
        view.on('dragenter')
            .select('.grid-header')
            .execute(this.onDragEnter.bind(this))
            .subscribe();
        view.on('dragover')
            .select('.grid-header')
            .execute(this.onDragOver.bind(this))
            .subscribe();
        view.on('dragleave')
            .select('.grid-header')
            .execute(this.onDragLeave.bind(this))
            .subscribe();
        view.on('drop')
            .select('.grid-header')
            .execute(this.onDrop.bind(this))
            .subscribe();
        view.handleClick(this.onClick.bind(this));
    }

    private onDragStart(sourceElement: HTMLElement, evt: JQuery.DragStartEvent) {
        const cell = this.getCellByElement(sourceElement);
        if (cell && cell instanceof ODataHeaderCell && cell.column.canMove) {
            const dragEvent = evt.originalEvent as DragEvent;
            dragEvent.dataTransfer.effectAllowed = 'move';
            cell.styleAsDragStart();
            this.dragStartCell = cell;
            return true;
        }
        return false;
    }

    private onDragEnd(sourceElement: HTMLElement, evt: JQuery.Event) {
        if (this.dragStartCell) {
            this.dragStartCell.styleAsDragEnd();
            this.dragStartCell = null;
        }
        if (this.dragEnterCell) {
            this.dragEnterCell.styleAsDragLeave();
            this.dragEnterCell = null;
        }
        return true;
    }

    private onDragEnter(sourceElement: HTMLElement, evt: JQuery.DragEnterEvent) {
        const cell = this.getCellByElement(sourceElement);
        if (cell && cell instanceof ODataHeaderCell && cell.column.canMove) {
            this.dragEnterCell = cell;
            cell.styleAsDragOver();
            const dragEvt = evt.originalEvent as DragEvent;
            dragEvt.dataTransfer.dropEffect = 'move';
        }
        return false;
    }

    private onDragOver(sourceElement: HTMLElement, evt: JQuery.Event) {
        evt.preventDefault();
    }

    private onDragLeave(sourceElement: HTMLElement, evt: JQuery.Event) {
        const cell = this.getCellByElement(sourceElement);
        if (cell && cell instanceof ODataHeaderCell && this.dragEnterCell !== cell) {
            cell.styleAsDragLeave();
        }
    }

    private onDrop(sourceElement: HTMLElement, evt: JQuery.Event) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.dragStartCell) {
            this.dragStartCell.styleAsDragEnd();
            const cell = this.getCellByElement(sourceElement);
            if (cell && cell instanceof ODataHeaderCell) {
                cell.styleAsDragLeave();
                this.eventSource.events.headerCellDropped.invoke(
                    new HeaderCellDroppedEventArgs(this.dragStartCell.column.columnName, cell.column.columnName)
                );
            }
            this.dragStartCell = null;
        }
        if (this.dragEnterCell) {
            this.dragEnterCell.styleAsDragLeave();
            this.dragEnterCell = null;
        }
    }

    private onClick(sourceElement: HTMLElement, event: JQuery.Event) {
        const row = this.getComponentByElement(sourceElement) as ODataRow;
        if (row) {
            const cell = row.getCellByElement(sourceElement);
            if (cell) {
                if (cell.record) {
                    this.eventSource.events.dataCellClicked.invoke(
                        new ODataCellClickedEventArgs(
                            row,
                            cell.column,
                            cell.record,
                            sourceElement,
                            event
                        )
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

    private getCellByElement(sourceElement: HTMLElement) {
        const row = this.getComponentByElement(sourceElement) as ODataRow;
        if (row) {
            return row.getCellByElement(sourceElement);
        }
        return null;
    }

    filterChanged(filter: ODataQueryFilterBuilder) {
        const headerRowView = this.getComponents()[0] as ODataHeaderRow;
        headerRowView.setFilter(filter);
    }

    orderByChanged(orderBy: ODataQueryOrderByBuilder) {
        const headerRowView = this.getComponents()[0] as ODataHeaderRow;
        headerRowView.setOrderBy(orderBy);
    }

    clearData() { this.clearComponents(); }

    setData(columns: ODataColumn[], records: Queryable<TEntity>[]) {
        this.clearComponents();
        this.view.clearContents();
        const columnViews = columns.map(column => column.view);
        this.view.setSelectedTemplateColumns(columnViews);
        const headerRowView = this.view.addHeaderRow(columnViews);
        const headerRow = new ODataHeaderRow(columns, headerRowView);
        this.addComponent(headerRow);
        if (records.length > 0) {
            let rowIndex = 1;
            for (const record of records) {
                const dataRowView = this.view.addDataRow(columnViews);
                const dataRow = this.createDataRow(rowIndex, columns, record, dataRowView);
                this.addComponent(dataRow);
                rowIndex++;
            }
        }
        else {
            const alert = this.addComponent(new MessageAlert(this.view.addAlertRow()));
            alert.warning('No Records were found.');
        }
        this.view.resize();
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }

    protected onDispose() {
        this.eventSource.unregisterAll();
    }
}