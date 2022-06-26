import { AppApiAction } from '../../Lib/Api/AppApiAction';
import { AppApiEvents } from '../../Lib/Api/AppApiEvents';
import { AppResourceUrl } from '../../Lib/Api/AppResourceUrl';
import { BasicPage } from '../../Lib/Components/BasicPage';
import { AsyncCommand } from '../../Lib/Components/Command';
import { MessageAlert } from '../../Lib/Components/MessageAlert';
import { ConsoleLog } from '../../Lib/ConsoleLog';
import { TextBlock } from '../../Lib/Html/TextBlock';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { AddEmployeeForm } from './AddEmployeeForm';
import { MainPageView } from './MainPageView';

class MainPage extends BasicPage {
    protected readonly view: MainPageView;
    private readonly alert: MessageAlert;
    private readonly addEmployeeForm: AddEmployeeForm;
    private readonly saveCommand: AsyncCommand;

    constructor() {
        super(new MainPageView());
        new TextBlock('Add Employee', this.view.heading);
        this.alert = new MessageAlert(this.view.alert);
        this.addEmployeeForm = new AddEmployeeForm(this.view.addEmployeeForm);
        this.saveCommand = new AsyncCommand(this.save.bind(this));
        this.saveCommand.add(this.view.saveButton);
        this.saveCommand.add(this.view.submitButton);
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
        const result = await action.execute(5, {});
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
                const result = await this.addEmployeeForm.save(action);
                if (result.succeeded()) {
                    alert(`Success: ${result.value}`);
                }
            }
        );
    }
}
new DefaultPageContext().load();
new MainPage();