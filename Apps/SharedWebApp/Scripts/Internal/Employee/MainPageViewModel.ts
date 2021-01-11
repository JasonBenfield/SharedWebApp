import * as template from './MainPage.html';
import { PageViewModel } from '../../Shared/PageViewModel';
import { singleton } from 'tsyringe';
import { AddEmployeeFormViewModel } from './AddEmployeeFormViewModel';
import { createCommandButtonViewModel } from '../../Shared/Templates/CommandButtonTemplate';
import { AlertViewModel } from '../../Shared/Alert';

@singleton()
export class MainPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }

    readonly alert = new AlertViewModel();
    readonly addEmployeeForm = new AddEmployeeFormViewModel();
    readonly saveCommand = createCommandButtonViewModel();
}