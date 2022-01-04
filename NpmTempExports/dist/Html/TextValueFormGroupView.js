"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextValueFormGroupView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("./BlockViewModel");
var PlainTextFormGroupView_1 = require("./PlainTextFormGroupView");
var TextBlockView_1 = require("./TextBlockView");
var TextValueFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(TextValueFormGroupView, _super);
    function TextValueFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.valueText = _this.valueColumn.addContent(new TextBlockView_1.TextBlockView());
        return _this;
    }
    return TextValueFormGroupView;
}(PlainTextFormGroupView_1.PlainTextFormGroupView));
exports.TextValueFormGroupView = TextValueFormGroupView;
//# sourceMappingURL=TextValueFormGroupView.js.map