"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlockView = void 0;
var tslib_1 = require("tslib");
var HtmlComponent_1 = require("./HtmlComponent");
var TextBlockViewModel_1 = require("./TextBlockViewModel");
var TextBlockView = /** @class */ (function (_super) {
    tslib_1.__extends(TextBlockView, _super);
    function TextBlockView(vm) {
        if (vm === void 0) { vm = new TextBlockViewModel_1.TextBlockViewModel(); }
        return _super.call(this, vm) || this;
    }
    TextBlockView.prototype.setText = function (text) {
        this.vm.text(text);
    };
    TextBlockView.prototype.setTitle = function (title) {
        this.vm.title(title);
    };
    return TextBlockView;
}(HtmlComponent_1.HtmlComponent));
exports.TextBlockView = TextBlockView;
//# sourceMappingURL=TextBlockView.js.map