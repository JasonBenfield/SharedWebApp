"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroupView = void 0;
var tslib_1 = require("tslib");
var Column_1 = require("../Grid/Column");
var LabelColumn_1 = require("../Grid/LabelColumn");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var TextSpanView_1 = require("../Html/TextSpanView");
var MarginCss_1 = require("../MarginCss");
var FormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(FormGroupView, _super);
    function FormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.captionColumn = _this.addContent(new LabelColumn_1.LabelColumn());
        _this.caption = _this.captionColumn.addContent(new TextSpanView_1.TextSpanView());
        _this.valueColumn = _this.addContent(new Column_1.Column());
        _this.addCssName('form-group row');
        _this.setMargin(MarginCss_1.MarginCss.bottom(3));
        return _this;
    }
    return FormGroupView;
}(Block_1.Block));
exports.FormGroupView = FormGroupView;
//# sourceMappingURL=FormGroupView.js.map