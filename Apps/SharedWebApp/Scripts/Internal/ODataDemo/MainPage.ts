import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppApiQuery } from '../../Lib/Api/AppApiQuery';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { BasicPage } from '../../Lib/Components/BasicPage';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { ApiODataClient } from '../../Lib/OData/ApiODataClient';
import { NumberValueFormatter } from '../../Lib/OData/NumberValueFormatter';
import { ODataCellClickedEventArgs } from '../../Lib/OData/ODataCellClickedEventArgs';
import { ODataColumn } from '../../Lib/OData/ODataColumn';
import { ODataComponent } from '../../Lib/OData/ODataComponent';
import { ODataComponentOptionsBuilder } from '../../Lib/OData/ODataComponentOptionsBuilder';
import { GridRowView } from '../../Lib/Views/Grid';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { ODataDemoRow } from './ODataDemoRow';
import { ODataEmployeeColumnsBuilder } from './ODataEmployeeColumnsBuilder';

class MainPage extends BasicPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('OData Demo');
        const columns = new ODataEmployeeColumnsBuilder(this.view.columns);
        columns.ID.require();
        columns.Salary.setFormatter(new NumberValueFormatter('$0,0.00'));
        const options = new ODataComponentOptionsBuilder<IEmployee>('demo', columns);
        options.setPageSize(9);
        options.query.select.addFields(
            columns.ID,
            columns.EmployeeName,
            columns.DateHired,
            columns.Salary
        );
        options.saveChanges();
        const odataGroup = new AppApiQuery<IEmptyRequest, IEmployee>(
            new AppApiEvents(() => { }),
            AppResourceUrl.odata(
                'Shared',
                '',
                pageContext.CacheBust
            ).withGroup('EmployeeQuery'),
            'EmployeeQuery'
        );
        const odataClient = new ApiODataClient(odataGroup, {});
        options.setODataClient(odataClient);
        options.setCreateDataRow(
            (rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) =>
                new ODataDemoRow(rowIndex, columns, record, view)
        );
        options.endColumns.add('Action', this.view.btnGroupColumn);
        options.endColumns.add('Dropdown', this.view.dropdownColumn);
        const odataComponent = new ODataComponent(this.view.odataComponentView, options.build());
        odataComponent.when.dataCellClicked.then(this.onDataCellClick.bind(this));
        odataComponent.refresh();
    }

    private onDataCellClick(args: ODataCellClickedEventArgs) {
        if (this.view.isEditButton(args.element)) {
            alert(`Edit clicked: ${args.column.columnName}${args.record['ID']}`);
            args.event.stopPropagation();
        }
        else if (this.view.isDeleteButton(args.element)) {
            alert(`Delete clicked: ${args.column.columnName}${args.record['ID']}`);
            args.event.stopPropagation();
        }
        else if (this.view.isWarnButton(args.element)) {
            const row = args.row as ODataDemoRow;
            row.warn();
        }
        else if (this.view.isHighlightButton(args.element)) {
            const row = args.row as ODataDemoRow;
            row.highlight();
        }
        else if (args.record[args.column.columnName]) {
            alert(args.record[args.column.columnName]);
        }
    }

}
new DefaultPageContext().load();
new MainPage();