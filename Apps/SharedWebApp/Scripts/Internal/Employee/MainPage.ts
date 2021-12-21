import { Startup } from '../../Shared/Startup';
import { AppApiAction } from '../../Shared/AppApiAction';
import { AppApiEvents } from '../../Shared/AppApiEvents';
import { AppResourceUrl } from '../../Shared/AppResourceUrl';
import { AsyncCommand } from '../../Shared/Command/AsyncCommand';
import { ConsoleLog } from '../../Shared/ConsoleLog';
import { MessageAlert } from '../../Shared/MessageAlert';
import { PageFrameView } from '../../Shared/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';
import { AddEmployeeForm } from './AddEmployeeForm';
import { MainPageView } from './MainPageView';

class MainPage {
    private readonly view: MainPageView;
    private readonly alert: MessageAlert;
    private readonly addEmployeeForm: AddEmployeeForm;
    private readonly saveCommand: AsyncCommand;

    constructor(page: PageFrameView) {
        new DefaultPageContext().load();
        this.view = new MainPageView(page);
        this.alert = new MessageAlert(this.view.alert);
        this.addEmployeeForm = new AddEmployeeForm( this.view.addEmployeeForm);
        this.saveCommand = new AsyncCommand(this.save.bind(this));
        this.saveCommand.add(this.view.saveButton);
        this.saveCommand.add(this.view.submitButton);
        this.test();
    }

    private async test() {
        let action = new AppApiAction<number, number>(
            new AppApiEvents(() => { }),
            AppResourceUrl.app(
                `${location.protocol}//${location.host}`, 'Shared', 'Current', '', ''
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
                    AppResourceUrl.app(`${location.protocol}//${location.host}`, 'Shared', 'Current', '', '').withGroup('Employee'),
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
new MainPage(new Startup().build());