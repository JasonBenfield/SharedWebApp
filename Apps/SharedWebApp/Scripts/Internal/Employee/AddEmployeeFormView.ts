import { BaseFormView } from '../../Lib/Views/BaseFormView';
import { BasicComponentView } from '../../Lib/Views/BasicComponentView';
import { InputFormGroupView, SelectFormGroupView } from '../../Lib/Views/FormGroup';
import { IFormGroupLayout } from '../../Lib/Views/Types';
import { AddressInputFieldView } from './AddressInputFieldView';

export interface IAddEmployeeFormView {
    EmployeeName: InputFormGroupView;
    BirthDate: InputFormGroupView;
    Department: SelectFormGroupView;
    Address: AddressInputFieldView;
}

export class DefaultAddEmployeeFormViewLayout implements IFormGroupLayout<IAddEmployeeFormView> {
    addFormGroups(form: AddEmployeeFormView) {
        return {
            EmployeeName: form.addInputFormGroup(),
            BirthDate: form.addInputFormGroup(),
            Department: form.addDropDownFormGroup(),
            Address: form.addFormGroup(AddressInputFieldView)
        };
    }
}

export class AddEmployeeFormView extends BaseFormView {
    private formGroups: IAddEmployeeFormView;

    constructor(container: BasicComponentView) {
        super(container);
    }

    addContent(layout?: IFormGroupLayout<IAddEmployeeFormView>) {
        if (!layout) {
            layout = new DefaultAddEmployeeFormViewLayout();
        }
        this.formGroups = layout.addFormGroups(this);
    }

    get EmployeeName() { return this.formGroups.EmployeeName; }

    get BirthDate() { return this.formGroups.BirthDate; }

    get Department() { return this.formGroups.Department; }

    get Address() { return this.formGroups.Address; }
}