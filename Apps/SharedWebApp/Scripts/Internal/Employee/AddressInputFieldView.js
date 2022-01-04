"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputFieldView = void 0;
var tslib_1 = require("tslib");
var ComplexFieldFormGroupView_1 = require("../../Shared/Forms/ComplexFieldFormGroupView");
var AddressInputFieldView = /** @class */ (function (_super) {
    tslib_1.__extends(AddressInputFieldView, _super);
    function AddressInputFieldView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Line1 = _this.addInputFormGroup();
        _this.City = _this.addInputFormGroup();
        _this.State = _this.addInputFormGroup();
        _this.Zip = _this.addInputFormGroup();
        return _this;
    }
    return AddressInputFieldView;
}(ComplexFieldFormGroupView_1.ComplexFieldFormGroupView));
exports.AddressInputFieldView = AddressInputFieldView;
//# sourceMappingURL=AddressInputFieldView.js.map