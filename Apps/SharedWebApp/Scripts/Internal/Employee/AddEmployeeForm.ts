﻿import { AddEmployeeFormViewModel } from "./AddEmployeeFormViewModel";
import { Form } from '../../Shared/Forms/Form';
import { DropDownFieldItem } from "../../Shared/Forms/DropDownFieldItem";
import { AddressInputField } from "./AddressInputField";

export class AddEmployeeForm extends Form {
    constructor(private readonly vm: AddEmployeeFormViewModel) {
        super('AddEmployeeForm');
        this.Name.caption.setCaption("Name");
        this.Name.setValue('Paul Atreides')
        this.Name.constraints.mustNotBeNull();
        this.Name.constraints.mustNotBeWhitespace('must not be blank');
        this.BirthDate.caption.setCaption("Birth Date");
        this.BirthDate.constraints.mustNotBeNull();
        this.BirthDate.constraints.mustBeAbove(new Date(1920, 1, 1), 'must be greater than 1/1/1920');
        this.BirthDate.constraints.mustBeOnOrBelow(new Date(2000, 1, 1), 'must be less than or equal to 1/1/2000');
        this.Department.setItemCaption("Select...");
        this.Department.setItems(
            new DropDownFieldItem(10, "HR"),
            new DropDownFieldItem(20, "IT")
        );
        this.Department.caption.setCaption("Department");
        this.Address.caption.setCaption('Address');
    }

    readonly Name = this.addTextInputField('Name', this.vm.Name);
    readonly BirthDate = this.addDateInputField('BirthDate', this.vm.BirthDate);
    readonly Department = this.addDropDownField<number>('Department', this.vm.Department);
    readonly Address = this.addField(new AddressInputField(this.getName(), 'Address', this.vm.Address));
}