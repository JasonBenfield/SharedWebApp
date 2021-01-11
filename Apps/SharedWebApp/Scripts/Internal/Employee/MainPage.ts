import 'reflect-metadata';
import { MainPageViewModel } from "./MainPageViewModel";
import { startup } from 'xtistart';
import { singleton } from 'tsyringe';
import { AddEmployeeForm } from './AddEmployeeForm';
import { AsyncCommand } from '../../Shared/Command';
import { AppApiAction } from '../../Shared/AppApiAction';
import { AppApiEvents } from '../../Shared/AppApiEvents';
import { AppResourceUrl } from '../../Shared/AppResourceUrl';
import { Alert } from '../../Shared/Alert';
import { ColumnCss } from '../../Shared/ColumnCss';

@singleton()
class MainPage {
    constructor(private readonly vm: MainPageViewModel) {
        this.addEmployeeForm.EmployeeName.setColumns(new ColumnCss(4), new ColumnCss());
        this.addEmployeeForm.BirthDate.setColumns(new ColumnCss(4), new ColumnCss());
        this.addEmployeeForm.Department.setColumns(new ColumnCss(4), new ColumnCss());
        this.addEmployeeForm.Address.setColumns(new ColumnCss(4), new ColumnCss());
        this.saveCommand.setText('Save');
        this.saveCommand.makeLight();
    }

    readonly alert = new Alert(this.vm.alert);
    private readonly addEmployeeForm = new AddEmployeeForm(this.vm.addEmployeeForm);
    private readonly saveCommand = new AsyncCommand(this.vm.saveCommand, this.save.bind(this));

    private async save() {
        await this.alert.infoAction(
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
startup(MainPageViewModel, MainPage);