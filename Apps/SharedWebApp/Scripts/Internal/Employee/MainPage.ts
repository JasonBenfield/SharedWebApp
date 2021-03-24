import { AsyncCommand } from '../../Shared/Command/AsyncCommand';
import { AppApiAction } from '../../Shared/AppApiAction';
import { AppApiEvents } from '../../Shared/AppApiEvents';
import { AppResourceUrl } from '../../Shared/AppResourceUrl';
import { ColumnCss } from '../../Shared/ColumnCss';
import { ContextualClass } from '../../Shared/ContextualClass';
import { MessageAlert } from '../../Shared/MessageAlert';
import { AddEmployeeForm } from './AddEmployeeForm';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { Block } from '../../Shared/Html/Block';
import { Container } from '../../Shared/Html/Container';
import { TextHeading1 } from '../../Shared/Html/TextHeading1';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { Toolbar } from '../../Shared/Html/Toolbar';
import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { PaddingCss } from '../../Shared/PaddingCss';
import { AddressInputLayout } from './AddressInputLayout';
import { ConsoleLog } from '../../Shared/ConsoleLog';
import { PageFrame } from '../../Shared/PageFrame';
import { Startup } from 'xtistart';

class MainPage {
    constructor(private readonly page: PageFrame) {
        let flexColumn = this.page.addContent(new FlexColumn());
        let headerRow = flexColumn.addContent(new Block());
        headerRow.addContent(new Container());
        headerRow.addContent(new TextHeading1('Add Employee'));
        let flexFill = flexColumn.addContent(new FlexColumnFill());
        this.alert = flexFill.addContent(new MessageAlert());
        this.addEmployeeForm = flexFill.container.addContent(new AddEmployeeForm());
        let toolbar = flexColumn.addContent(new Toolbar());
        toolbar.setPadding(PaddingCss.xs(3));
        toolbar.setBackgroundContext(ContextualClass.secondary);
        let saveCommandItem = toolbar.columnEnd.addContent(new ButtonCommandItem());
        saveCommandItem.icon.solidStyle();
        saveCommandItem.icon.setName('check');
        saveCommandItem.setText('Save');
        saveCommandItem.setContext(ContextualClass.light);
        this.saveCommand = new AsyncCommand(this.save.bind(this));
        this.saveCommand.add(saveCommandItem);
        this.saveCommand.add(this.addEmployeeForm.addOffscreenSubmit());
        this.addEmployeeForm.forEachFormGroup(fg => {
            fg.captionColumn.setColumnCss(ColumnCss.xs(4));
        });
        this.test();
        this.addEmployeeForm.Address.useLayout((fg) => new AddressInputLayout(fg));
        this.addEmployeeForm.submitted.register(this.onFormSubmit.bind(this));
        this.addEmployeeForm.executeLayout();
    }

    private onFormSubmit() {
        this.saveCommand.execute();
    }

    private readonly alert: MessageAlert;
    private readonly addEmployeeForm: AddEmployeeForm;
    private readonly saveCommand: AsyncCommand;

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