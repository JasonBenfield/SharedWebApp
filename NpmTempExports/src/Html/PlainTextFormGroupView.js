"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainTextFormGroupView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("./BlockViewModel");
var FormGroupView_1 = require("./FormGroupView");
var PlainTextFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(PlainTextFormGroupView, _super);
    function PlainTextFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.valueColumn.addCssName('form-control-plaintext');
        return _this;
    }
    return PlainTextFormGroupView;
}(FormGroupView_1.FormGroupView));
exports.PlainTextFormGroupView = PlainTextFormGroupView;
//# sourceMappingURL=PlainTextFormGroupView.js.map