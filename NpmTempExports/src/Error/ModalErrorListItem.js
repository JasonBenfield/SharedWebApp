"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorListItem = void 0;
var TextBlock_1 = require("../Html/TextBlock");
var ModalErrorListItem = /** @class */ (function () {
    function ModalErrorListItem(error, view, isCaptionVisible) {
        this.error = error;
        new TextBlock_1.TextBlock(error.Caption, view.caption);
        new TextBlock_1.TextBlock(error.Message, view.message);
        if (isCaptionVisible) {
            view.showCaption();
        }
        else {
            view.hideCaption();
        }
    }
    return ModalErrorListItem;
}());
exports.ModalErrorListItem = ModalErrorListItem;
//# sourceMappingURL=ModalErrorListItem.js.map