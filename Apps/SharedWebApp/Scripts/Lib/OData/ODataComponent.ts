import { ODataResult } from "../Api/ODataResult";
import { AsyncCommand, Command } from "../Components/Command";
import { MessageAlert } from "../Components/MessageAlert";
import { EventBuilders, EventSource } from '../Events';
import { ButtonCommandView } from "../Views/Command";
import { ModalODataComponent } from "./ModalODataComponent";
import { ODataCell } from "./ODataCell";
import { ODataCellClickedEventArgs } from "./ODataCellClickedEventArgs";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataComponentView } from "./ODataComponentView";
import { ODataFooterComponent } from "./ODataFooterComponent";
import { HeaderCellDroppedEventArgs, ODataGrid } from "./ODataGrid";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataHeaderCellView } from "./ODataHeaderCellView";
import { ODataPage } from "./ODataPage";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { SourceType } from "./SourceType";
import { IODataClient, SaveChangesOptions } from "./Types";

type Events = {
    dataCellClicked: ODataCellClickedEventArgs;
    refreshed: any;
};

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly modalODataComponent: ModalODataComponent;
    private readonly odataClient: IODataClient<TEntity>;
    private readonly selectionColumn: ODataColumn;
    private readonly columns: ODataColumnAccessor;
    private readonly query: ODataQueryBuilder;
    private readonly currentPage: ODataPage;
    private readonly footerComponent: ODataFooterComponent;
    private readonly refreshCommand: AsyncCommand;
    private readonly excelCommand: AsyncCommand;
    private readonly id: string;
    private readonly saveChangesOptions: SaveChangesOptions;

    private static readonly columnStartName = 'ColumnStart';
    private static readonly columnEndName = 'ColumnEnd';

    private readonly eventSource = new EventSource<Events>(
        this,
        {
            dataCellClicked: null as ODataCellClickedEventArgs,
            refreshed: null as any
        }
    );
    readonly when = this.eventSource.when;

    constructor(private readonly view: ODataComponentView, private readonly options: ODataComponentOptions<TEntity>) {
        this.odataClient = options.odataClient;
        this.id = options.id;
        this.saveChangesOptions = options.saveChangesOptions;
        view.setViewID(`${options.id}ODataComponent`);
        this.selectionColumn = new ODataColumnBuilder(
            ODataComponent.columnStartName,
            SourceType.none,
            view.columnStart()
        )
            .setCreateHeaderCell((column, view) => new ODataCell(0, column, null, view))
            .disableSelect()
            .disableMove()
            .build();
        this.columns = new ODataColumnAccessor(options.startColumns, options.columns, options.endColumns);
        const columnEnd = new ODataColumnBuilder(
            ODataComponent.columnEndName,
            SourceType.none,
            view.columnEnd()
        )
            .setCreateHeaderCell((column, view: ODataHeaderCellView) => new ODataHeaderCell(column, view))
            .disableSelect()
            .disableMove()
            .build();
        this.options.endColumns.push(columnEnd);
        this.query = new ODataQueryBuilder(options.defaultQuery);
        this.query.select.addRequiredFields(this.columns.requiredDatabaseColumns());
        if (options.saveChangesOptions.select) {
            const serializedSelect = localStorage.getItem(`odata_${this.id}_select`);
            if (serializedSelect) {
                this.query.select.clear();
                this.query.select.fromSerialized(JSON.parse(serializedSelect));
            }
        }
        if (options.saveChangesOptions.filter) {
            const serializedFilter = localStorage.getItem(`odata_${this.id}_filter`);
            if (serializedFilter) {
                this.query.filter.clear();
                this.query.filter.fromSerialized(JSON.parse(serializedFilter));
            }
        }
        if (options.saveChangesOptions.orderby) {
            const serializedOrderBy = localStorage.getItem(`odata_${this.id}_orderby`);
            if (serializedOrderBy) {
                this.query.orderBy.clear();
                this.query.orderBy.fromSerialized(JSON.parse(serializedOrderBy));
            }
        }
        this.grid = new ODataGrid(view.grid, options.createDataRow);
        this.alert = new MessageAlert(view.alert);
        this.modalODataComponent = new ModalODataComponent(this.query, this.columns, view.modalODataComponent);
        this.currentPage = new ODataPage(options.pageSize);
        this.currentPage.pageChanged(1, this.query);
        this.footerComponent = new ODataFooterComponent(this.view.footerComponent);
        this.refreshCommand = new AsyncCommand(this._refresh.bind(this));
        this.refreshCommand.add(this.view.footerComponent.addRefreshButton());
        this.excelCommand = new Command(this.exportToExcel.bind(this));
        this.excelCommand.add(this.view.footerComponent.addExcelButton());
        this.footerComponent.when.pageRequested.then(this.onPageRequested.bind(this));
        this.grid.when.sortClicked.then(this.onSortClick.bind(this));
        this.grid.when.headerCellClicked.then(this.onHeaderCellClick.bind(this));
        this.grid.when.headerCellDropped.then(this.onHeaderCellDropped.bind(this));
        this.grid.when.dataCellClicked.then(this.onDataCellClicked.bind(this));
    }

    private exportToExcel() {
        this.odataClient.toExcel(this.query.buildWithoutPaging());
    }

    private onSortClick(column: ODataColumn) {
        if (column.canSort) {
            const field = this.query.orderBy.getField(column.columnName);
            this.query.orderBy.clear();
            if (field && field.isAscending) {
                this.query.orderBy.addDescending(column);
            }
            else {
                this.query.orderBy.addAscending(column);
            }
            this.grid.orderByChanged(this.query.orderBy);
            this.refresh();
        }
    }

    private async onHeaderCellClick(column: ODataColumn) {
        if (column.columnName === ODataComponent.columnStartName) {
            if (this.options.canSelectColumns) {
                await this.modalODataComponent.showSelect();
                await this.refresh();
            }
        }
        else if (column.canFilter) {
            await this.modalODataComponent.showFilter(column);
            await this.refresh();
        }
    }

    private onHeaderCellDropped(eventArgs: HeaderCellDroppedEventArgs) {
        this.query.select.moveField(eventArgs.source, eventArgs.destination);
        return this.refresh();
    }

    private onDataCellClicked(eventArgs: ODataCellClickedEventArgs) {
        this.eventSource.events.dataCellClicked.invoke(eventArgs);
    }

    private onPageRequested(page: number) {
        this.currentPage.pageChanged(page, this.query);
        this.refresh();
    }

    showFooter() {
        this.view.footerComponent.show();
    }

    hideFooter() {
        this.view.footerComponent.hide();
    }

    addButtonToRefreshCommand(button: ButtonCommandView) {
        this.refreshCommand.add(button);
    }

    addButtonToExcelCommand(button: ButtonCommandView) {
        this.excelCommand.add(button);
    }

    refresh() { return this.refreshCommand.execute(); }

    private async _refresh() {
        this.grid.clearData();
        const query = this.query.build();
        let result: ODataResult<TEntity>;
        try {
            await this.alert.infoAction(
                'Loading...',
                async () => {
                    result = await this.odataClient.execute(query);
                }
            );
        }
        catch (err) {
            this.alert.danger(err ? err.toString() : 'An Error Occurred');
            return;
        }
        this.currentPage.countChanged(result.count);
        const gridColumns: ODataColumn[] = [];
        if (this.options.canSelectColumns) {
            gridColumns.push(this.selectionColumn);
        }
        gridColumns.push(...this.options.startColumns);
        const selectedColumnNames = this.query.select.getExplicitlySelected();
        gridColumns.push(...this.columns.columns(selectedColumnNames));
        gridColumns.push(...this.options.endColumns);
        this.grid.setData(gridColumns, result.records);
        this.footerComponent.setPaging(
            this.currentPage.page,
            this.currentPage.numberOfPages
        );
        this.footerComponent.setCount(
            this.currentPage.startRecord,
            this.currentPage.startRecord + result.records.length - 1,
            result.count
        );
        this.grid.filterChanged(this.query.filter);
        this.grid.orderByChanged(this.query.orderBy);
        if (this.saveChangesOptions.select) {
            localStorage.setItem(`odata_${this.id}_select`, JSON.stringify(this.query.select.serialize()));
        }
        if (this.saveChangesOptions.filter) {
            localStorage.setItem(`odata_${this.id}_filter`, JSON.stringify(this.query.filter.serialize()));
        }
        if (this.saveChangesOptions.orderby) {
            localStorage.setItem(`odata_${this.id}_orderby`, JSON.stringify(this.query.orderBy.serialize()));
        }
        this.eventSource.events.refreshed.invoke();
    }
}