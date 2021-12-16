"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputField = void 0;
var tslib_1 = require("tslib");
var ComplexFieldFormGroup_1 = require("../../Shared/Forms/ComplexFieldFormGroup");
var AddressInputField = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputField, _super);
    function AddressInputField(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.Line1 = _this.addTextInputFormGroup('Line1', _this.view.Line1);
        _this.City = _this.addTextInputFormGroup('City', _this.view.City);
        _this.State = _this.addTextInputFormGroup('State', _this.view.State);
        _this.Zip = _this.addNumberInputFormGroup('Zip', _this.view.Zip);
        return _this;
    }
    return AddressInputField;
}(ComplexFieldFormGroup_1.ComplexFieldFormGroup));
exports.AddressInputField = AddressInputField;
//# sourceMappingURL=AddressInputField.js.map