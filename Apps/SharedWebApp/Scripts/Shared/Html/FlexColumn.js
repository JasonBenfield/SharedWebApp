"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexColumn = void 0;
var tslib_1 = require("tslib");
var FlexCss_1 = require("../FlexCss");
var Block_1 = require("./Block");
var BlockViewModel_1 = require("./BlockViewModel");
var FlexColumn = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(FlexColumn, _super);
    function FlexColumn(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.addCssName('d-flex h-100');
        _this.addCssFrom(new FlexCss_1.FlexCss().column());
        return _this;
    }
    return FlexColumn;
}(Block_1.Block));
exports.FlexColumn = FlexColumn;
//# sourceMappingURL=FlexColumn.js.map