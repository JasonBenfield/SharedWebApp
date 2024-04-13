import { TextComponent } from '../../Lib/Components/TextComponent';
import { NumberValueFormatter } from '../../Lib/OData/NumberValueFormatter';
import { ODataCellClickedEventArgs } from '../../Lib/OData/ODataCellClickedEventArgs';
import { ODataColumn } from '../../Lib/OData/ODataColumn';
import { ODataComponent } from '../../Lib/OData/ODataComponent';
import { ODataComponentOptionsBuilder } from '../../Lib/OData/ODataComponentOptionsBuilder';
import { ODataRefreshedEventArgs } from '../../Lib/OData/ODataRefreshedEventArgs';
import { Url } from '../../Lib/Url';
import { UrlBuilder } from '../../Lib/UrlBuilder';
import { GridRowView } from '../../Lib/Views/Grid';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { MainPageView } from './MainPageView';
import { ODataDemoRow } from './ODataDemoRow';
import { ODataEmployeeColumnsBuilder } from './ODataEmployeeColumnsBuilder';

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly odataComponent: ODataComponent<IEmployee>;

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
        columns.EmployeeName.disableSelect();
        //options.disableSelectColumns();
        //options.disableFilter();
        //options.disableSort();
        options.setDefaultODataClient(this.sharedClient.EmployeeQuery, { args: {} });
        options.setCreateDataRow(
            (rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) =>
                new ODataDemoRow(rowIndex, columns, record, view)
        );
        options.endColumns.add('Action', this.view.btnGroupColumn);
        options.endColumns.add('Dropdown', this.view.dropdownColumn);
        this.odataComponent = new ODataComponent(this.view.odataComponentView, options.build());
        //this.odataComponent.hideFooter();
        this.odataComponent.when.dataCellClicked.then(this.onDataCellClick.bind(this));
        this.odataComponent.when.refreshed.then(this.onRefreshed.bind(this));
        const page = Url.current().query.getNumberValue('page');
        this.odataComponent.setCurrentPage(page);
        this.odataComponent.refresh();
        const url1 = Url.current();
        console.log(`[${new Date().toISOString()}] page load ${url1.value()}`);
        window.onpopstate = this.onPopState.bind(this);
    }

    private onPopState() {
        const url1 = Url.current();
        console.log(`[${new Date().toISOString()}] pop state ${url1.value()}`);
        //const pageText = Url.current().getQueryValue('page');
        //const page = pageText ? Number(pageText) : 1;
        //if (page !== this.odataComponent.pageNumber) {
        //    this.odataComponent.setCurrentPage(page);
        //    this.odataComponent.refresh();
        //}
    }

    private onRefreshed(args: ODataRefreshedEventArgs) {
        const page = args.page > 1 ? args.page.toString() : '';
        const url = UrlBuilder.current();
        const queryPageValue = url.query.getNumberValue('page');
        const queryPage = queryPageValue && queryPageValue > 1 ? queryPageValue.toString() : '';
        if (page !== queryPage) {
            if (page) {
                url.replaceQuery('page', page);
            }
            else {
                url.removeQuery('page');
            }
            history.replaceState({}, '', url.value());
        }
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