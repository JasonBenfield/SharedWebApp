"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLabel = void 0;
var tslib_1 = require("tslib");
var Label_1 = require("./Label");
var LabelViewModel_1 = require("./LabelViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextLabel = /** @class */ (function (_super) {
    tslib_1.__extends(TextLabel, _super);
    function TextLabel(vm) {
        if (vm === void 0) { vm = new LabelViewModel_1.LabelViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextLabel.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextLabel.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextLabel;
}(Label_1.Label));
exports.TextLabel = TextLabel;
//# sourceMappingURL=TextLabelView.js.map