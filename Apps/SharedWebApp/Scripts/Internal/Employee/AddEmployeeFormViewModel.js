"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmployeeFormViewModel = void 0;
var ko = require("knockout");
var InputFieldViewModel_1 = require("../../Shared/Forms/InputFieldViewModel");
var DropDownFieldViewModel_1 = require("../../Shared/Forms/DropDownFieldViewModel");
var ComponentTemplateAsync_1 = require("../../Shared/ComponentTemplateAsync");
var AddressInputFieldViewModel_1 = require("./AddressInputFieldViewModel");
var AddEmployeeFormViewModel = /** @class */ (function () {
    function AddEmployeeFormViewModel() {
        this.componentName = ko.observable('add-employee-form');
        this.Name = new InputFieldViewModel_1.InputFieldViewModel();
        this.BirthDate = new InputFieldViewModel_1.InputFieldViewModel();
        this.Department = new DropDownFieldViewModel_1.DropDownFieldViewModel();
        this.Address = new AddressInputFieldViewModel_1.AddressInputFieldViewModel();
        new ComponentTemplateAsync_1.ComponentTemplateAsync(this.componentName(), location.protocol + "//" + location.host + "/Shared/Current/Employee/AddEmployeeForm").register();
    }
    return AddEmployeeFormViewModel;
}());
exports.AddEmployeeFormViewModel = AddEmployeeFormViewModel;
//# sourceMappingURL=AddEmployeeFormViewModel.js.map