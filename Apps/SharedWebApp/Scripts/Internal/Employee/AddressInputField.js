"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputField = void 0;
var tslib_1 = require("tslib");
var ComplexField_1 = require("../../Shared/Forms/ComplexField");
var AddressInputField = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputField, _super);
    function AddressInputField(prefix, name, vm) {
        var _this = _super.call(this, prefix, name, vm.caption, vm.value) || this;
        _this.vm = vm;
        _this.Line1 = _this.addTextInputField('Line1', _this.vm.value.Line1);
        _this.City = _this.addTextInputField('City', _this.vm.value.City);
        _this.State = _this.addTextInputField('State', _this.vm.value.State);
        _this.Zip = _this.addTextInputField('Zip', _this.vm.value.Zip);
        return _this;
    }
    return AddressInputField;
}(ComplexField_1.ComplexField));
exports.AddressInputField = AddressInputField;
//# sourceMappingURL=AddressInputField.js.map