"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFormGroupView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var Input_1 = require("../Html/Input");
var SimpleFieldFormGroupView_1 = require("./SimpleFieldFormGroupView");
var InputFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(InputFormGroupView, _super);
    function InputFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.input = _this.inputGroup.insertContent(0, new Input_1.Input());
        _this.input.addCssName('form-control');
        return _this;
    }
    return InputFormGroupView;
}(SimpleFieldFormGroupView_1.SimpleFieldFormGroupView));
exports.InputFormGroupView = InputFormGroupView;
//# sourceMappingURL=InputFormGroupView.js.map