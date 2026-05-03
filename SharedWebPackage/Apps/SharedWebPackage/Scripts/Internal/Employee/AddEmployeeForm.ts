import { DateOnly } from '../../Lib/DateOnly';
import { BaseForm } from '../../Lib/Forms/BaseForm';
import { DropDownFieldItem } from "../../Lib/Forms/DropDownFieldItem";
import { Month } from '../../Lib/Month';
import { AddEmployeeFormView } from './AddEmployeeFormView';
import { AddressInputField } from './AddressInputField';

export class AddEmployeeForm extends BaseForm {
    constructor(protected readonly view: AddEmployeeFormView) {
        super('AddEmployeeForm', view);
        this.EmployeeName.setCaption("Name");
        this.EmployeeName.setValue('Paul Atreides')
        this.EmployeeName.constraints.mustNotBeNull();
        this.EmployeeName.constraints.mustNotBeWhitespace('must not be blank');
        this.BirthDate.setCaption("Birth Date");
        this.BirthDate.constraints.mustNotBeNull();
        this.BirthDate.constraints.mustBeAbove(new DateOnly(1920, Month.January, 1), 'must be greater than 1/1/1920');
        this.BirthDate.constraints.mustBeOnOrBelow(new DateOnly(2000, Month.January, 1), 'must be less than or equal to 1/1/2000');
        this.Salary.setCaption("Salary");
        this.Salary.format = '$0,0.00';
        this.Salary.constraints.mustNotBeNull();
        this.Department.constraints.mustNotBeNull();
        this.Department.setItemCaption("Select...");
        this.Department.setItems([
            new DropDownFieldItem(10, "HR"),
            new DropDownFieldItem(20, "IT")
        ]);
        this.Department.setCaption("Department");
        this.Address.setCaption('Address');
    }

    get EmployeeName() { return this.addTextInputFormGroup('EmployeeName', this.view.EmployeeName); }
    get BirthDate() { return this.addDateInputFormGroup('BirthDate', this.view.BirthDate); }
    get Salary() { return this.addNumberInputFormGroup('Salary', this.view.Salary); }
    get Department() { return this.addNumberDropDownFormGroup('Department', this.view.Department); }
    get Address() {
        return this.addFormGroup(
            new AddressInputField(this.getName(), 'Address', this.view.Address)
        );
    }
}