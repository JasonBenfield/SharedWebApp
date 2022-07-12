import { AppApiQuery } from "../Api/AppApiQuery";
import { ODataResult } from "../Api/ODataResult";
import { AsyncCommand, Command } from "../Components/Command";
import { MessageAlert } from "../Components/MessageAlert";
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

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly modalODataComponent: ModalODataComponent;
    private readonly odataGroup: AppApiQuery<TEntity>;
    private readonly columns: ODataColumnAccessor;
    private readonly query: ODataQueryBuilder;
    private readonly currentPage: ODataPage;
    private readonly footerComponent: ODataFooterComponent;
    private readonly refreshCommand: AsyncCommand;
    private readonly excelCommand: AsyncCommand;

    private static readonly columnStartName = 'ColumnStart';
    private static readonly columnEndName = 'ColumnEnd';

    constructor(private readonly view: ODataComponentView, options: ODataComponentOptions<TEntity>) {
        this.odataGroup = options.odataGroup;
        options.columns[ODataComponent.columnStartName] = new ODataColumnBuilder(
            ODataComponent.columnStartName,
            SourceType.none,
            view.columnStart()
        )
            .setCreateHeaderCell((column, view) => new ODataCell(0, column, null, view))
            .disableSelect()
            .disableMove()
            .build();
        options.columns[ODataComponent.columnEndName] = new ODataColumnBuilder(
            ODataComponent.columnEndName,
            SourceType.none,
            view.columnEnd()
        )
            .setCreateHeaderCell((column, view: ODataHeaderCellView) => new ODataHeaderCell(column, view))
            .disableSelect()
            .disableMove()
            .build();
        view.setViewID(`${options.id}ODataComponent`);
        this.columns = new ODataColumnAccessor(options.columns);
        this.query = new ODataQueryBuilder(options.defaultQuery);
        this.query.select.addRequiredFields(this.columns.requiredDatabaseColumns());
        this.grid = new ODataGrid(view.grid);
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
        this.grid.when.dataCellClicked.then(this.onDataCellClick.bind(this));
        this.grid.when.headerCellDropped.then(this.onHeaderCellDropped.bind(this));
    }

    private exportToExcel() {
        this.odataGroup.toExcel(this.query.buildWithoutPaging());
    }

    private onSortClick(column: ODataColumn) {
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

    private async onHeaderCellClick(column: ODataColumn) {
        if (column.columnName === ODataComponent.columnStartName) {
            await this.modalODataComponent.showSelect();
            await this.refresh();
        }
        else if (!column.sourceType.isNone()) {
            await this.modalODataComponent.showFilter(column);
            await this.refresh();
        }
    }

    private onHeaderCellDropped(eventArgs: HeaderCellDroppedEventArgs) {
        this.query.select.moveField(eventArgs.source, eventArgs.destination);
        return this.refresh();
    }

    private onDataCellClick(args: ODataCellClickedEventArgs) {
        const value = args.record ? `\n${args.record[args.column.columnName]}` : '';
        alert(`${args.column.columnName}${value}`);
    }

    private onPageRequested(page: number) {
        this.currentPage.pageChanged(page, this.query);
        this.refresh();
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
                    result = await this.odataGroup.execute(query, { preventDefault: true });
                }
            );
        }
        catch (err) {
            this.alert.danger(err ? err.toString() : 'An Error Occurred');
            return;
        }
        this.currentPage.countChanged(result.count);
        const selectedColumnNames = this.query.select.getExplicitlySelected();
        const gridColumns = this.columns.columns(selectedColumnNames);
        gridColumns.splice(0, 0, this.columns.column(ODataComponent.columnStartName));
        gridColumns.push(this.columns.column(ODataComponent.columnEndName));
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
        this.grid.orderByChanged(this.query.orderBy);
    }
}