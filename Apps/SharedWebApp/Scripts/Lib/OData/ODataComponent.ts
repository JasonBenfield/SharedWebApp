import { AppApiError } from "../Api/AppApiError";
import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ODataResult } from "../Api/ODataResult";
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
import { ODataGrid } from "./ODataGrid";
import { ODataPage } from "./ODataPage";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { SourceType } from "./SourceType";

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly modalODataComponent: ModalODataComponent;
    private readonly odataGroup: AppApiODataGroup<TEntity>;
    private readonly columns: ODataColumnAccessor;
    private readonly query: ODataQueryBuilder;
    private readonly currentPage: ODataPage;
    private readonly footerComponent: ODataFooterComponent;

    private static readonly gearHeaderColumnName = 'GearHeader';

    constructor(private readonly view: ODataComponentView, options: ODataComponentOptions<TEntity>) {
        this.odataGroup = options.odataGroup;
        options.columns[ODataComponent.gearHeaderColumnName] = new ODataColumnBuilder(
            ODataComponent.gearHeaderColumnName,
            SourceType.none,
            view.gearHeaderView()
        )
            .setCreateHeaderCell((column, view) => new ODataCell(0, column, null, view))
            .disableSelect().build();
        this.columns = new ODataColumnAccessor(options.columns);
        this.query = new ODataQueryBuilder(options.defaultQuery);
        this.query.select.addRequiredFields(this.columns.requiredSelectableColumns());
        this.grid = new ODataGrid(view.grid);
        this.alert = new MessageAlert(view.alert);
        this.modalODataComponent = new ModalODataComponent(this.query, this.columns, view.modalODataComponent);
        this.currentPage = new ODataPage(options.pageSize);
        this.currentPage.pageChanged(1, this.query);
        this.footerComponent = new ODataFooterComponent(this.view.footerComponent);
        this.footerComponent.when.pageRequested.then(this.onPageRequested.bind(this));
        this.grid.when.sortClicked.then(this.onSortClick.bind(this));
        this.grid.when.headerCellClicked.then(this.onHeaderCellClick.bind(this));
        this.grid.when.dataCellClicked.then(this.onDataCellClick.bind(this));
    }

    private onSortClick(column: ODataColumn) {
        const field = this.query.orderBy.getField(column.columnName);
        this.query.orderBy.clear();
        if (field && field.isAscending) {
            this.query.orderBy.addDescending(column.columnName);
        }
        else {
            this.query.orderBy.addAscending(column.columnName);
        }
        this.grid.orderByChanged(this.query.orderBy);
        this.refresh();
    }

    private async onHeaderCellClick(column: ODataColumn) {
        if (column.columnName === ODataComponent.gearHeaderColumnName) {
            await this.modalODataComponent.showSelect();
        }
        else if (column.isSelectable) {
            await this.modalODataComponent.showFilter(column);
        }
        await this.refresh();
    }

    private onDataCellClick(args: ODataCellClickedEventArgs) {
        const value = args.record ? `\n${args.record[args.column.columnName]}` : '';
        alert(`${args.column.columnName}${value}`);
    }

    private onPageRequested(page: number) {
        this.currentPage.pageChanged(page, this.query);
        this.refresh();
    }

    async refresh() {
        this.grid.clearData();
        const query = this.query.build();
        let result: ODataResult<TEntity>;
        try {
            await this.alert.infoAction(
                'Loading...',
                async () => {
                    result = await this.odataGroup.Get(query, { preventDefault: true });
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
        gridColumns.splice(0, 0, this.columns.column(ODataComponent.gearHeaderColumnName));
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