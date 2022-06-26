import { IFormGroupLayout } from '../../Lib/Views/Types';
import { AddEmployeeFormView, IAddEmployeeFormView } from './AddEmployeeFormView';
import { AddressInputFieldView } from './AddressInputFieldView';
import { AddressInputLayout } from './AddressInputLayout';

export class AddEmployeeFormLayout implements IFormGroupLayout<IAddEmployeeFormView> {
    addFormGroups(form: AddEmployeeFormView) {
        const employeeName = form.addInputFormGroup();
        const birthDate = form.addInputFormGroup();
        const department = form.addDropDownFormGroup();
        const address = form.addFormGroup(AddressInputFieldView);
        address.addFormGroups(new AddressInputLayout());
        return {
            EmployeeName: employeeName,
            BirthDate: birthDate,
            Department: department,
            Address: address
        };
    }
}