import { AsyncCommand } from '../../Lib/Components/Command';
import { MessageAlert } from '../../Lib/Components/MessageAlert';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { ConsoleLog } from '../../Lib/ConsoleLog';
import { DateOnly } from '../../Lib/DateOnly';
import { DateTimeOffset } from '../../Lib/DateTimeOffset';
import { DeviceType } from '../../Lib/DeviceType';
import { AppVersionDomain } from '../../Lib/Http/AppVersionDomain';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { AddEmployeeForm } from './AddEmployeeForm';
import { MainPageView } from './MainPageView';

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly alert: MessageAlert;
    private readonly addEmployeeForm: AddEmployeeForm;
    private readonly saveCommand: AsyncCommand;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Add Employee');
        this.alert = new MessageAlert(this.view.alert);
        this.addEmployeeForm = new AddEmployeeForm(this.view.addEmployeeForm);
        this.addEmployeeForm.handleSubmit(this.onFormSubmit.bind(this));
        this.saveCommand = new AsyncCommand(this.save.bind(this));
        this.saveCommand.add(this.view.saveButton);
        this.test();
        DeviceType.instance.canFocus = true;
        this.addEmployeeForm.Address.setFocus();
        AppVersionDomain.instance.addDomain({
            App: 'Shared',
            Version: 'Current',
            Domain: 'development.guinevere.com:44303'
        });
        console.log(`DateOnly.today() < DateOnly.today().addDays(1): ${DateOnly.today() < DateOnly.today().addDays(1)}`);
        console.log(`DateOnly.today() > DateOnly.today().addDays(1): ${DateOnly.today() > DateOnly.today().addDays(1)}`);
        console.log(`DateOnly.today().addDays(1) > DateOnly.today(): ${DateOnly.today().addDays(1) > DateOnly.today()}`);
        console.log(`DateOnly.today().addDays(1) < DateOnly.today(): ${DateOnly.today().addDays(1) < DateOnly.today()}`);
        console.log(`DateOnly.today() <= DateOnly.today(): ${DateOnly.today() <= DateOnly.today()}`);
        console.log(`DateOnly.today() >= DateOnly.today(): ${DateOnly.today() >= DateOnly.today()}`);

        console.log(`DateTimeOffset.today() < DateTimeOffset.today().addDays(1): ${DateTimeOffset.today() < DateTimeOffset.today().addDays(1)}`);
        console.log(`DateTimeOffset.today() > DateTimeOffset.today().addDays(1): ${DateTimeOffset.today() > DateTimeOffset.today().addDays(1)}`);
        console.log(`DateTimeOffset.today().addDays(1) > DateTimeOffset.today(): ${DateTimeOffset.today().addDays(1) > DateTimeOffset.today()}`);
        console.log(`DateTimeOffset.today().addDays(1) < DateTimeOffset.today(): ${DateTimeOffset.today().addDays(1) < DateTimeOffset.today()}`);
        console.log(`DateTimeOffset.today() <= DateTimeOffset.today(): ${DateTimeOffset.today() <= DateTimeOffset.today()}`);
        console.log(`DateTimeOffset.today() >= DateTimeOffset.today(): ${DateTimeOffset.today() >= DateTimeOffset.today()}`);
    }

    private onFormSubmit() {
        this.saveCommand.execute();
    }

    private async test() {
        const result = await this.sharedClient.Employee.Test(5);
        new ConsoleLog().info(result.toString());
    }

    private save() {
        return this.alert.infoAction(
            'Saving...',
            async () => {
                const result = await this.addEmployeeForm.save(this.sharedClient.Employee.AddEmployeeAction);
                if (result.succeeded()) {
                    alert(`Success: ${result.value}`);
                }
            }
        );
    }
}
new DefaultPageContext().load();
new MainPage();