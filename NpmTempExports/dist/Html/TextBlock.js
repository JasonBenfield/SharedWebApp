"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBlock = void 0;
var TextBlock = /** @class */ (function () {
    function TextBlock(text, view) {
        this.view = view;
        this.setText(text);
    }
    TextBlock.prototype.setText = function (text) {
        this.text = text;
        this.view.setText(text);
    };
    TextBlock.prototype.setTitle = function (title) { this.view.setTitle(title); };
    TextBlock.prototype.syncTitleWithText = function (format) {
        this.formatTitle = format || (function (text) { return text; });
        this.updateTitleFromText();
    };
    TextBlock.prototype.updateTitleFromText = function () {
        if (this.formatTitle) {
            this.setTitle(this.formatTitle(this.text));
        }
    };
    return TextBlock;
}());
exports.TextBlock = TextBlock;
//# sourceMappingURL=TextBlock.js.map