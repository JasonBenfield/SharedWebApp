import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ODataResult } from "../Api/ODataResult";
import { MessageAlert } from "../MessageAlert";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataComponentView } from "./ODataComponentView";
import { ODataGrid } from "./ODataGrid";

export class ODataComponent<TEntity> {
    private readonly grid: ODataGrid<TEntity>;
    private readonly alert: MessageAlert;
    private readonly odataGroup: AppApiODataGroup<TEntity>;

    constructor(
        private readonly view: ODataComponentView,
        options: ODataComponentOptions<TEntity>
    ) {
        this.odataGroup = options.odataGroup;
        this.grid = new ODataGrid(options.columns, view.grid);
        this.alert = new MessageAlert(view.alert);
    }

    async refresh() {
        console.log(this.odataGroup.url().value());
        let result: ODataResult<TEntity>;
        await this.alert.infoAction(
            'Loading...',
            async () => {
                result = await this.odataGroup.Get('');
            }
        );
        this.grid.setData(<any[]>['ID', 'EmployeeName', 'DateHired', 'Salary'], result.records);
    }
}