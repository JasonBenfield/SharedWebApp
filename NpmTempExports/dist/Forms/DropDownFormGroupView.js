"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownFormGroupView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var Select_1 = require("../Html/Select");
var SimpleFieldFormGroupView_1 = require("./SimpleFieldFormGroupView");
var DropDownFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownFormGroupView, _super);
    function DropDownFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.select = _this.inputGroup.insertContent(0, new Select_1.Select());
        _this.select.addCssName('form-control');
        return _this;
    }
    return DropDownFormGroupView;
}(SimpleFieldFormGroupView_1.SimpleFieldFormGroupView));
exports.DropDownFormGroupView = DropDownFormGroupView;
//# sourceMappingURL=DropDownFormGroupView.js.map