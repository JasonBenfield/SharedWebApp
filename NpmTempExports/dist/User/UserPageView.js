"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPageView = void 0;
var MessageAlertView_1 = require("../MessageAlertView");
var UserPageView = /** @class */ (function () {
    function UserPageView(page) {
        this.page = page;
        this.alert = this.page.addContent(new MessageAlertView_1.MessageAlertView());
    }
    return UserPageView;
}());
exports.UserPageView = UserPageView;
//# sourceMappingURL=UserPageView.js.map