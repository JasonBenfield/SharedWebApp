"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTitleHeader = void 0;
var CardTitleHeader = /** @class */ (function () {
    function CardTitleHeader(title, view) {
        if (title === void 0) { title = ''; }
        this.view = view;
        this.view.setText(title);
    }
    CardTitleHeader.prototype.setText = function (text) {
        this.view.setText(text);
    };
    return CardTitleHeader;
}());
exports.CardTitleHeader = CardTitleHeader;
//# sourceMappingURL=CardTitleHeader.js.map