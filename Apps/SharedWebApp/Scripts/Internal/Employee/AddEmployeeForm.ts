import { BaseForm } from '../../Shared/Forms/BaseForm';
import { DropDownFieldItem } from "../../Shared/Forms/DropDownFieldItem";
import { FormComponentViewModel } from '../../Shared/Html/FormComponentViewModel';
import { AddressInputField } from './AddressInputField';

export class AddEmployeeForm extends BaseForm {
    constructor(vm: FormComponentViewModel = new FormComponentViewModel()) {
        super('AddEmployeeForm', vm);
        this.EmployeeName.setCaption("Name");
        this.EmployeeName.setValue('Paul Atreides')
        this.EmployeeName.constraints.mustNotBeNull();
        this.EmployeeName.constraints.mustNotBeWhitespace('must not be blank');
        this.BirthDate.setCaption("Birth Date");
        this.BirthDate.constraints.mustNotBeNull();
        this.BirthDate.constraints.mustBeAbove(new Date(1920, 1, 1), 'must be greater than 1/1/1920');
        this.BirthDate.constraints.mustBeOnOrBelow(new Date(2000, 1, 1), 'must be less than or equal to 1/1/2000');
        this.Department.constraints.mustNotBeNull();
        this.Department.setItemCaption("Select...");
        this.Department.setItems(
            new DropDownFieldItem(10, "HR"),
            new DropDownFieldItem(20, "IT")
        );
        this.Department.setCaption("Department");
        this.Address.setCaption('Address');
    }

    readonly EmployeeName = this.addTextInputFormGroup('Name');
    readonly BirthDate = this.addDateInputFormGroup('BirthDate');
    readonly Department = this.addNumberDropDownFormGroup('Department');
    readonly Address = this.addFormGroup(new AddressInputField(this.getName(), 'Address'));
}