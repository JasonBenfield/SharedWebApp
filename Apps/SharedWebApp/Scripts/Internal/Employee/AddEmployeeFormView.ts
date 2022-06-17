import { BaseFormView } from '../../Lib/Forms/BaseFormView';
import { AddressInputFieldView } from './AddressInputFieldView';

export class AddEmployeeFormView extends BaseFormView {
    readonly EmployeeName = this.addInputFormGroup();
    readonly BirthDate = this.addInputFormGroup();
    readonly Department = this.addDropDownFormGroup<number>();
    readonly Address = this.addFormGroup(new AddressInputFieldView());
}