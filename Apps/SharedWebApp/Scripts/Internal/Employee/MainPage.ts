import { Startup } from '../../Lib/Startup';
import { AppApiAction } from '../../Lib/Api/AppApiAction';
import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { AsyncCommand } from '../../Lib/Command/AsyncCommand';
import { ConsoleLog } from '../../Lib/ConsoleLog';
import { MessageAlert } from '../../Lib/MessageAlert';
import { PageFrameView } from '../../Lib/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';
import { AddEmployeeForm } from './AddEmployeeForm';
import { MainPageView } from './MainPageView';
import { TextBlock } from '../../Lib/Html/TextBlock';

class MainPage {
    private readonly alert: MessageAlert;
    private readonly addEmployeeForm: AddEmployeeForm;
    private readonly saveCommand: AsyncCommand;

    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('Add Employee', view.heading);
        this.alert = new MessageAlert(view.alert);
        this.addEmployeeForm = new AddEmployeeForm(view.addEmployeeForm);
        this.saveCommand = new AsyncCommand(this.save.bind(this));
        this.saveCommand.add(view.saveButton);
        this.saveCommand.add(view.submitButton);
        this.test();
    }

    private async test() {
        let action = new AppApiAction<number, number>(
            new AppApiEvents(() => { }),
            AppResourceUrl.app(
                'Shared',
                '',
                pageContext.CacheBust
            )
                .withGroup('Employee'),
            'Test',
            'Test'
        );
        let result = await action.execute(5, {});
        new ConsoleLog().info(result.toString());
    }

    private save() {
        return this.alert.infoAction(
            'Saving...',
            async () => {
                let action = new AppApiAction<any, number>(
                    new AppApiEvents(() => { }),
                    AppResourceUrl.app(
                        'Shared',
                        '',
                        pageContext.CacheBust
                    ).withGroup('Employee'),
                    'AddEmployee',
                    'Add Employee'
                );
                let result = await this.addEmployeeForm.save(action);
                if (result.succeeded()) {
                    alert(`Success: ${result.value}`);
                }
            }
        );
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());