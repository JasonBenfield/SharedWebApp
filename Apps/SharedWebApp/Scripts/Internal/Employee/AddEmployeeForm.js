"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmployeeForm = void 0;
var tslib_1 = require("tslib");
var BaseForm_1 = require("../../Shared/Forms/BaseForm");
var DropDownFieldItem_1 = require("../../Shared/Forms/DropDownFieldItem");
var FormComponentViewModel_1 = require("../../Shared/Html/FormComponentViewModel");
var AddressInputField_1 = require("./AddressInputField");
var AddEmployeeForm = /** @class */ (function (_super) {
    tslib_1.__extends(AddEmployeeForm, _super);
    function AddEmployeeForm(vm) {
        if (vm === void 0) { vm = new FormComponentViewModel_1.FormComponentViewModel(); }
        var _this = _super.call(this, 'AddEmployeeForm', vm) || this;
        _this.EmployeeName = _this.addTextInputFormGroup('Name');
        _this.BirthDate = _this.addDateInputFormGroup('BirthDate');
        _this.Department = _this.addNumberDropDownFormGroup('Department');
        _this.Address = _this.addFormGroup(new AddressInputField_1.AddressInputField(_this.getName(), 'Address'));
        _this.EmployeeName.setCaption("Name");
        _this.EmployeeName.setValue('Paul Atreides');
        _this.EmployeeName.constraints.mustNotBeNull();
        _this.EmployeeName.constraints.mustNotBeWhitespace('must not be blank');
        _this.BirthDate.setCaption("Birth Date");
        _this.BirthDate.constraints.mustNotBeNull();
        _this.BirthDate.constraints.mustBeAbove(new Date(1920, 1, 1), 'must be greater than 1/1/1920');
        _this.BirthDate.constraints.mustBeOnOrBelow(new Date(2000, 1, 1), 'must be less than or equal to 1/1/2000');
        _this.Department.constraints.mustNotBeNull();
        _this.Department.setItemCaption("Select...");
        _this.Department.setItems(new DropDownFieldItem_1.DropDownFieldItem(10, "HR"), new DropDownFieldItem_1.DropDownFieldItem(20, "IT"));
        _this.Department.setCaption("Department");
        _this.Address.setCaption('Address');
        return _this;
    }
    return AddEmployeeForm;
}(BaseForm_1.BaseForm));
exports.AddEmployeeForm = AddEmployeeForm;
//# sourceMappingURL=AddEmployeeForm.js.map