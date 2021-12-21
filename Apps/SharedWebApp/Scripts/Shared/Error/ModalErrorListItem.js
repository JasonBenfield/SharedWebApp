"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorListItem = void 0;
var ModalErrorListItem = /** @class */ (function () {
    function ModalErrorListItem(error, view, isCaptionVisible) {
        this.error = error;
        view.setCaption(error.Caption);
        view.setMessage(error.Message);
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