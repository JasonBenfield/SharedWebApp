"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputFieldViewModel = exports.AddressInputValueViewModel = void 0;
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("../../Shared/ComponentTemplate");
var ComplexFieldViewModel_1 = require("../../Shared/Forms/ComplexFieldViewModel");
var FieldValueViewModel_1 = require("../../Shared/Forms/FieldValueViewModel");
var InputFieldViewModel_1 = require("../../Shared/Forms/InputFieldViewModel");
var template = require("./AddressInput.html");
var AddressInputValueViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputValueViewModel, _super);
    function AddressInputValueViewModel() {
        var _this = _super.call(this) || this;
        _this.Line1 = _this.addValue(new InputFieldViewModel_1.InputFieldViewModel());
        _this.City = _this.addValue(new InputFieldViewModel_1.InputFieldViewModel());
        _this.State = _this.addValue(new InputFieldViewModel_1.InputFieldViewModel());
        _this.Zip = _this.addValue(new InputFieldViewModel_1.InputFieldViewModel());
        _this.inputComponentName('address-input');
        new ComponentTemplate_1.ComponentTemplate(_this.inputComponentName(), template).register();
        return _this;
    }
    return AddressInputValueViewModel;
}(FieldValueViewModel_1.ComplexFieldValueViewModel));
exports.AddressInputValueViewModel = AddressInputValueViewModel;
var AddressInputFieldViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputFieldViewModel, _super);
    function AddressInputFieldViewModel() {
        return _super.call(this, new AddressInputValueViewModel()) || this;
    }
    return AddressInputFieldViewModel;
}(ComplexFieldViewModel_1.ComplexFieldViewModel));
exports.AddressInputFieldViewModel = AddressInputFieldViewModel;
//# sourceMappingURL=AddressInputFieldViewModel.js.map