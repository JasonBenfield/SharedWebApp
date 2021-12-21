"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmployeeFormView = void 0;
var tslib_1 = require("tslib");
var BaseFormView_1 = require("../../Shared/Forms/BaseFormView");
var AddressInputFieldView_1 = require("./AddressInputFieldView");
var AddEmployeeFormView = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AddEmployeeFormView, _super);
    function AddEmployeeFormView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.EmployeeName = _this.addInputFormGroup();
        _this.BirthDate = _this.addInputFormGroup();
        _this.Department = _this.addDropDownFormGroup();
        _this.Address = _this.addFormGroup(new AddressInputFieldView_1.AddressInputFieldView());
        return _this;
    }
    return AddEmployeeFormView;
}(BaseFormView_1.BaseFormView));
exports.AddEmployeeFormView = AddEmployeeFormView;
//# sourceMappingURL=AddEmployeeFormView.js.map