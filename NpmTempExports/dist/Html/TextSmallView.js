"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSmallView = void 0;
var tslib_1 = require("tslib");
var Small_1 = require("./Small");
var SmallViewModel_1 = require("./SmallViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextSmallView = /** @class */ (function (_super) {
    tslib_1.__extends(TextSmallView, _super);
    function TextSmallView(vm) {
        if (vm === void 0) { vm = new SmallViewModel_1.SmallViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextSmallView.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    TextSmallView.prototype.setTitle = function (title) {
        this.textSpan.setTitle(title);
    };
    return TextSmallView;
}(Small_1.Small));
exports.TextSmallView = TextSmallView;
//# sourceMappingURL=TextSmallView.js.map