import * as ko from 'knockout';
import { InputFieldViewModel } from "../../Shared/Forms/InputFieldViewModel";
import { DropDownFieldViewModel } from "../../Shared/Forms/DropDownFieldViewModel";
import { ComponentTemplateAsync } from '../../Shared/ComponentTemplateAsync';
import { AddressInputFieldViewModel } from './AddressInputFieldViewModel';

export class AddEmployeeFormViewModel {
    constructor() {
        new ComponentTemplateAsync(
            this.componentName(),
            `${location.protocol}//${location.host}/Shared/Current/Employee/AddEmployeeForm`
        ).register();
    }

    readonly componentName = ko.observable('add-employee-form');
    readonly Name = new InputFieldViewModel();
    readonly BirthDate = new InputFieldViewModel();
    readonly Department = new DropDownFieldViewModel();
    readonly Address = new AddressInputFieldViewModel();
}