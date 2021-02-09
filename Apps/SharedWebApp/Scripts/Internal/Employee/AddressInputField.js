"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputField = void 0;
var tslib_1 = require("tslib");
var ComplexFieldFormGroup_1 = require("../../Shared/Forms/ComplexFieldFormGroup");
var BlockViewModel_1 = require("../../Shared/Html/BlockViewModel");
var AddressInputField = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputField, _super);
    function AddressInputField(prefix, name, vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, prefix, name, vm) || this;
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