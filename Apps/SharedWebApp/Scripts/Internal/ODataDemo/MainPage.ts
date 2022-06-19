import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppApiODataGroup } from '../../Lib/Api/AppApiODataGroup';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { TextBlock } from '../../Lib/Html/TextBlock';
import { NumberValueFormatter } from '../../Lib/OData/NumberValueFormatter';
import { ODataComponent } from '../../Lib/OData/ODataComponent';
import { ODataComponentOptionsBuilder } from '../../Lib/OData/ODataComponentOptionsBuilder';
import { PageFrameView } from '../../Lib/PageFrameView';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { ODataEmployeeColumnsBuilder } from './ODataEmployeeColumnsBuilder';

class MainPage {
    constructor(page: PageFrameView) {
        const view = new MainPageView(page);
        new TextBlock('OData Demo', view.heading);
        const columns = new ODataEmployeeColumnsBuilder(view.columns);
        columns.Salary.setFormatter(new NumberValueFormatter('$0,0.00'));
        const options = new ODataComponentOptionsBuilder<IEmployee>(columns);
        options.query.select.addFields(
            columns.EmployeeName,
            columns.DateHired,
            columns.Salary
        );
        const odataGroup = new AppApiODataGroup<IEmployee>(
            new AppApiEvents(() => { }),
            AppResourceUrl.odata(
                'Shared',
                '',
                pageContext.CacheBust
            ),
            'EmployeeQuery'
        );
        options.setODataGroup(odataGroup);
        const odataComponent = new ODataComponent(view.odataComponentView, options.build());
        odataComponent.refresh();
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());