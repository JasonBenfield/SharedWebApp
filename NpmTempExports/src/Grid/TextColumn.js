"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextColumn = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var TextSpanView_1 = require("../Html/TextSpanView");
var TextColumn = /** @class */ (function (_super) {
    tslib_1.__extends(TextColumn, _super);
    function TextColumn(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.setColumnCss(ColumnCss_1.ColumnCss.xs());
        _this.addCssName('col-form-label');
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextColumn.prototype.setColumnCss = function (columnCss) {
        this.replaceCssName(this.columnCss && this.columnCss.toString(), columnCss && columnCss.toString());
    };
    return TextColumn;
}(Block_1.Block));
exports.TextColumn = TextColumn;
//# sourceMappingURL=TextColumn.js.map