import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppApiQuery } from '../../Lib/Api/AppApiQuery';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { BasicPage } from '../../Lib/Components/BasicPage';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { NumberValueFormatter } from '../../Lib/OData/NumberValueFormatter';
import { ODataComponent } from '../../Lib/OData/ODataComponent';
import { ODataComponentOptionsBuilder } from '../../Lib/OData/ODataComponentOptionsBuilder';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { ODataEmployeeColumnsBuilder } from './ODataEmployeeColumnsBuilder';

class MainPage extends BasicPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('OData Demo');
        const columns = new ODataEmployeeColumnsBuilder(this.view.columns);
        columns.Salary.setFormatter(new NumberValueFormatter('$0,0.00'));
        const options = new ODataComponentOptionsBuilder<IEmployee>(columns);
        options.setPageSize(8);
        options.query.select.addFields(
            columns.ID,
            columns.EmployeeName,
            columns.DateHired,
            columns.Salary
        );
        //options.query.filter.add(
        //    FilterConditionOperation.greaterThan(
        //        new FilterField(columns.ID.columnName),
        //        new FilterValue(5)
        //    )
        //);
        const odataGroup = new AppApiQuery<IEmployee>(
            new AppApiEvents(() => { }),
            AppResourceUrl.odata(
                'Shared',
                '',
                pageContext.CacheBust
            ),
            'EmployeeQuery'
        );
        options.setODataGroup(odataGroup);
        const odataComponent = new ODataComponent(this.view.odataComponentView, options.build());
        odataComponent.refresh();
    }
}
new DefaultPageContext().load();
new MainPage();