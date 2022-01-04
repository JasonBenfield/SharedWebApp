"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextLink = void 0;
var tslib_1 = require("tslib");
var Link_1 = require("./Link");
var TextBlock_1 = require("./TextBlock");
var TextLink = /** @class */ (function (_super) {
    tslib_1.__extends(TextLink, _super);
    function TextLink(text, view) {
        var _this = _super.call(this, view) || this;
        _this.text = new TextBlock_1.TextBlock(text, view.textSpan);
        return _this;
    }
    TextLink.prototype.setText = function (text) {
        this.text.setText(text);
    };
    TextLink.prototype.setTitle = function (title) { this.text.setTitle(title); };
    TextLink.prototype.syncTitleWithText = function (format) {
        this.text.syncTitleWithText(format);
    };
    return TextLink;
}(Link_1.Link));
exports.TextLink = TextLink;
//# sourceMappingURL=TextLink.js.map