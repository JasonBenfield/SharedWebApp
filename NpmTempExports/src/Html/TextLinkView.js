"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLinkView = void 0;
var tslib_1 = require("tslib");
var LinkView_1 = require("./LinkView");
var LinkViewModel_1 = require("./LinkViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextLinkView = /** @class */ (function (_super) {
    tslib_1.__extends(TextLinkView, _super);
    function TextLinkView(vm) {
        if (vm === void 0) { vm = new LinkViewModel_1.LinkViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextLinkView.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextLinkView.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextLinkView;
}(LinkView_1.LinkView));
exports.TextLinkView = TextLinkView;
//# sourceMappingURL=TextLinkView.js.map