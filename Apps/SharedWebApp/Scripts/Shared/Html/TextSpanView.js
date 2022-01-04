"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSpanView = void 0;
var tslib_1 = require("tslib");
var TextSpanViewModel_1 = require("./TextSpanViewModel");
var HtmlComponent_1 = require("./HtmlComponent");
var TextSpanView = /** @class */ (function (_super) {
    tslib_1.__extends(TextSpanView, _super);
    function TextSpanView(vm) {
        if (vm === void 0) { vm = new TextSpanViewModel_1.TextSpanViewModel(); }
        return _super.call(this, vm) || this;
    }
    TextSpanView.prototype.setText = function (text) {
        this.vm.text(text);
    };
    TextSpanView.prototype.setTitle = function (title) {
        this.vm.title(title);
    };
    return TextSpanView;
}(HtmlComponent_1.HtmlComponent));
exports.TextSpanView = TextSpanView;
//# sourceMappingURL=TextSpanView.js.map