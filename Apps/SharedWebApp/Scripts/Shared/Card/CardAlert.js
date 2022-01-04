"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardAlert = void 0;
var MessageAlert_1 = require("../MessageAlert");
var CardAlert = /** @class */ (function () {
    function CardAlert(view) {
        this.view = view;
        this.alert = new MessageAlert_1.MessageAlert(this.view.alert);
        this.view.hide();
        this.alert.isVisibleChanged.register(this.onIsVisibleChanged.bind(this));
    }
    CardAlert.prototype.onIsVisibleChanged = function (isVisible) {
        if (isVisible) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    };
    return CardAlert;
}());
exports.CardAlert = CardAlert;
//# sourceMappingURL=CardAlert.js.map