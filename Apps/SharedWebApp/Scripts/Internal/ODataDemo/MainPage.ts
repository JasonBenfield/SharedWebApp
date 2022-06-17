import { XtiUrl } from '../../Lib/Api/XtiUrl';
import { TextBlock } from '../../Lib/Html/TextBlock';
import { ODataComponent } from '../../Lib/OData/ODataComponent';
import { ODataComponentOptionsBuilder } from '../../Lib/OData/ODataComponentOptionsBuilder';
import { ODataColumnBuilder } from '../../Lib/OData/ODataColumnBuilder';
import { PageFrameView } from '../../Lib/PageFrameView';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { IODataColumns } from '../../Lib/OData/Types';
import { AppApiODataGroup } from '../../Lib/Api/AppApiODataGroup';
import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';

interface IEmployee {
    ID: number;
    EmployeeName: string;
    DateHired: Date,
    Salary: number;
}

class ODataEmployeeColumnsBuilder {
    readonly ID = new ODataColumnBuilder('ID', 'Int32');
    readonly EmployeeName = new ODataColumnBuilder('EmployeeName', 'String');
    readonly DateHired = new ODataColumnBuilder('DateHired', 'DateTimeOffset');
    readonly Salary = new ODataColumnBuilder('Salary', 'Decimal');

    build() {
        return {
            ID: this.ID.build(),
            EmployeeName: this.EmployeeName.build(),
            DateHired: this.DateHired.build(),
            Salary: this.Salary.build()
        } as IODataColumns<IEmployee>;
    }
}

class MainPage {
    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('OData Demo', view.heading);
        let columns = new ODataEmployeeColumnsBuilder();
        let options = new ODataComponentOptionsBuilder<IEmployee>(columns);
        let odataGroup = new AppApiODataGroup<IEmployee>(
            new AppApiEvents(() => { }),
            AppResourceUrl.odata(
                'Shared',
                '',
                pageContext.CacheBust
            ),
            'EmployeeQuery'
        );
        options.setODataGroup(odataGroup);
        let odataComponent = new ODataComponent(view.odataComponentView, options.build());
        odataComponent.refresh();
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());