"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputField = void 0;
var tslib_1 = require("tslib");
var ComplexFieldFormGroup_1 = require("../../Shared/Forms/ComplexFieldFormGroup");
var ComplexFieldFormGroupView_1 = require("../../Shared/Forms/ComplexFieldFormGroupView");
var AddressInputField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AddressInputField, _super);
    function AddressInputField(prefix, name) {
        var _this = _super.call(this, prefix, name, new ComplexFieldFormGroupView_1.ComplexFieldFormGroupView()) || this;
        _this.Line1 = _this.addTextInputFormGroup('Line1');
        _this.City = _this.addTextInputFormGroup('City');
        _this.State = _this.addTextInputFormGroup('State');
        _this.Zip = _this.addNumberInputFormGroup('Zip');
        return _this;
    }
    return AddressInputField;
}(ComplexFieldFormGroup_1.ComplexFieldFormGroup));
exports.AddressInputField = AddressInputField;
//# sourceMappingURL=AddressInputField.js.map