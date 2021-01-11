"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmployeeForm = void 0;
var tslib_1 = require("tslib");
var Form_1 = require("../../Shared/Forms/Form");
var DropDownFieldItem_1 = require("../../Shared/Forms/DropDownFieldItem");
var AddressInputField_1 = require("./AddressInputField");
var AddEmployeeForm = /** @class */ (function (_super) {
    tslib_1.__extends(AddEmployeeForm, _super);
    function AddEmployeeForm(vm) {
        var _this = _super.call(this, 'AddEmployeeForm') || this;
        _this.vm = vm;
        _this.EmployeeName = _this.addTextInputField('Name', _this.vm.EmployeeName);
        _this.BirthDate = _this.addDateInputField('BirthDate', _this.vm.BirthDate);
        _this.Department = _this.addDropDownField('Department', _this.vm.Department);
        _this.Address = _this.addField(new AddressInputField_1.AddressInputField(_this.getName(), 'Address', _this.vm.Address));
        _this.EmployeeName.caption.setCaption("Name");
        _this.EmployeeName.setValue('Paul Atreides');
        _this.EmployeeName.constraints.mustNotBeNull();
        _this.EmployeeName.constraints.mustNotBeWhitespace('must not be blank');
        _this.BirthDate.caption.setCaption("Birth Date");
        _this.BirthDate.constraints.mustNotBeNull();
        _this.BirthDate.constraints.mustBeAbove(new Date(1920, 1, 1), 'must be greater than 1/1/1920');
        _this.BirthDate.constraints.mustBeOnOrBelow(new Date(2000, 1, 1), 'must be less than or equal to 1/1/2000');
        _this.Department.constraints.mustNotBeNull();
        _this.Department.setItemCaption("Select...");
        _this.Department.setItems(new DropDownFieldItem_1.DropDownFieldItem(10, "HR"), new DropDownFieldItem_1.DropDownFieldItem(20, "IT"));
        _this.Department.caption.setCaption("Department");
        _this.Address.caption.setCaption('Address');
        return _this;
    }
    return AddEmployeeForm;
}(Form_1.Form));
exports.AddEmployeeForm = AddEmployeeForm;
//# sourceMappingURL=AddEmployeeForm.js.map