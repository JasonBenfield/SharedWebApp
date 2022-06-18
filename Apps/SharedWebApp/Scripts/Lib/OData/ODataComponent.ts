import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ODataResult } from "../Api/ODataResult";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { MessageAlert } from "../MessageAlert";
import { IconCellLayout } from "./IconCellLayout";
import { IconCellLayoutView } from "./IconCellLayoutView";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnLayouts } from "./ODataColumnLayouts";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataComponentView } from "./ODataComponentView";
import { ODataGrid } from "./ODataGrid";
import { SourceType } from "./SourceType";
import { IODataColumns } from "./Types";

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly odataGroup: AppApiODataGroup<TEntity>;
    private readonly columns: IODataColumns = {};

    constructor(
        private readonly view: ODataComponentView,
        options: ODataComponentOptions<TEntity>
    ) {
        this.odataGroup = options.odataGroup;
        this.columns['RowHeader'] = new ODataColumn(
            'RowHeader',
            SourceType.none,
            view.createRowHeader()
        );
        for (const key in options.columns) {
            const column = options.columns[key];
            if (column instanceof ODataColumn) {
                this.columns[key] = column;
            }
        }
        this.grid = new ODataGrid(this.columns, view.grid);
        this.alert = new MessageAlert(view.alert);
        this.grid.cellClicked.register(this.onCellClick.bind(this));
    }

    private onCellClick(cell: ODataCell) {
        const value = cell.record ? `\n${cell.record[cell.column.columnName]}` : '';
        alert(`${cell.column.columnName}${value}`);
    }

    async refresh() {
        let result: ODataResult<TEntity>;
        await this.alert.infoAction(
            'Loading...',
            async () => {
                result = await this.odataGroup.Get('');
            }
        );
        this.grid.setData(['RowHeader', 'ID', 'EmployeeName', 'DateHired', 'Salary'], result.records);
    }
}