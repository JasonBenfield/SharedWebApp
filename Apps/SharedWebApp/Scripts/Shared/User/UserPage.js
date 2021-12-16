"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPage = void 0;
var MessageAlert_1 = require("../MessageAlert");
var UrlBuilder_1 = require("../UrlBuilder");
var WebPage_1 = require("../WebPage");
var UserPageView_1 = require("./UserPageView");
var UserPage = /** @class */ (function () {
    function UserPage(page, api) {
        this.view = new UserPageView_1.UserPageView(page);
        this.api = api;
        this.alert = new MessageAlert_1.MessageAlert(this.view.alert);
        this.goToReturnUrl();
    }
    UserPage.prototype.goToReturnUrl = function () {
        this.alert.info('Opening Page...');
        var urlBuilder = UrlBuilder_1.UrlBuilder.current();
        var returnUrl = urlBuilder.getQueryValue('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        }
        returnUrl = this.api ? this.api.url.addPart(returnUrl).value() : '/';
        new WebPage_1.WebPage(returnUrl).open();
    };
    return UserPage;
}());
exports.UserPage = UserPage;
//# sourceMappingURL=UserPage.js.map