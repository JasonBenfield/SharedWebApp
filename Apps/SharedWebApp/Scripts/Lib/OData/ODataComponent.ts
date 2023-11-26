import { AsyncCommand, Command } from "../Components/Command";
import { MessageAlert } from "../Components/MessageAlert";
import { EventSource } from '../Events';
import { ODataResult } from "../Http/ODataResult";
import { ParsedJsonText } from "../Http/ParsedJsonText";
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
import { ISerializableFilter } from "./ODataQueryFilterBuilder";
import { ODataRefreshedEventArgs } from "./ODataRefreshedEventArgs";
import { SourceType } from "./SourceType";
import { IODataClient, SaveChangesOptions } from "./Types";

type Events = {
    dataCellClicked: ODataCellClickedEventArgs;
    refreshed: ODataRefreshedEventArgs;
};

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly modalODataComponent: ModalODataComponent;
    private readonly odataClient: IODataClient<TEntity>;
    private readonly selectionColumn: ODataColumn;
    private readonly columns: ODataColumnAccessor;
    private readonly query: ODataQueryBuilder;
    private readonly _currentPage: ODataPage;
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
            refreshed: null as ODataRefreshedEventArgs
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
            const serializedSelect = localStorage.getItem(this.getStorageSelectKey());
            if (serializedSelect) {
                this.query.select.clear();
                this.query.select.fromSerialized(
                    new ParsedJsonText(serializedSelect).value,
                    this.columns.values()
                );
            }
        }
        if (options.saveChangesOptions.filter) {
            const serializedFilter = localStorage.getItem(this.getStorageFilterKey());
            if (serializedFilter) {
                this.query.filter.clear();
                const deserialized = new ParsedJsonText(serializedFilter).value as ISerializableFilter;
                this.query.filter.fromSerialized(deserialized, this.columns.values());
            }
        }
        if (options.saveChangesOptions.orderby) {
            const serializedOrderBy = localStorage.getItem(this.getStorageOrderByKey());
            if (serializedOrderBy) {
                this.query.orderBy.clear();
                this.query.orderBy.fromSerialized(new ParsedJsonText(serializedOrderBy).value, this.columns.values());
            }
        }
        this.grid = new ODataGrid(view.grid, options.createDataRow);
        this.alert = new MessageAlert(view.alert);
        this.modalODataComponent = new ModalODataComponent(this.query, this.columns, view.modalODataComponent);
        this._currentPage = new ODataPage(options.pageSize);
        this._currentPage.pageChanged(1, this.query);
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

    get pageNumber() { return this._currentPage.page; }

    private exportToExcel() {
        this.odataClient.toExcel(this.query.buildToExcel());
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
        this._currentPage.pageChanged(page, this.query);
        this.refresh();
    }

    setCurrentPage(page: number) {
        if (!page || Number.isNaN(page) || page < 0) {
            page = 1;
        }
        this._currentPage.pageChanged(page, this.query);
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
        this._currentPage.countChanged(result.count);
        if (result.count > 0 && this.pageNumber > this._currentPage.numberOfPages) {
            this._currentPage.pageChanged(this._currentPage.numberOfPages, this.query);
            await this._refresh();
        }
        else {
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
                this._currentPage.page,
                this._currentPage.numberOfPages
            );
            this.footerComponent.setCount(
                this._currentPage.startRecord,
                this._currentPage.startRecord + result.records.length - 1,
                result.count
            );
            this.grid.filterChanged(this.query.filter);
            this.grid.orderByChanged(this.query.orderBy);
            if (this.saveChangesOptions.select) {
                localStorage.setItem(this.getStorageSelectKey(), JSON.stringify(this.query.select.serialize()));
            }
            if (this.saveChangesOptions.filter) {
                localStorage.setItem(this.getStorageFilterKey(), JSON.stringify(this.query.filter.serialize()));
            }
            if (this.saveChangesOptions.orderby) {
                localStorage.setItem(this.getStorageOrderByKey(), JSON.stringify(this.query.orderBy.serialize()));
            }
            this.eventSource.events.refreshed.invoke(
                new ODataRefreshedEventArgs(this._currentPage.page)
            );
        }
    }

    private getStorageSelectKey() {
        return this.getStorageKey('select');
    }

    private getStorageFilterKey() {
        return this.getStorageKey('filter');
    }

    private getStorageOrderByKey() {
        return this.getStorageKey('orderby');
    }

    private getStorageKey(type: string) {
        return `odata_${pageContext.UserName}_${this.id}_${type}`;
    }
}