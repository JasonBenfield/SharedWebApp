"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiView = void 0;
var UrlBuilder_1 = require("../UrlBuilder");
var WebPage_1 = require("./WebPage");
var AppApiView = /** @class */ (function () {
    function AppApiView(resourceUrl, actionName) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }
    AppApiView.prototype.getUrl = function (data) {
        return this.getModifierUrl(null, data);
    };
    AppApiView.prototype.getModifierUrl = function (modifier, data) {
        var model;
        if (typeof data === 'string' || typeof data === 'number' || data instanceof Date) {
            model = { model: data };
        }
        else {
            model = data;
        }
        var resourceUrl = modifier === undefined || modifier === null
            ? this.resourceUrl
            : this.resourceUrl.withModifier(modifier);
        var urlBuilder = new UrlBuilder_1.UrlBuilder(resourceUrl.url.value());
        urlBuilder.addQueryFromObject(model);
        return urlBuilder;
    };
    AppApiView.prototype.open = function (data) {
        var webPage = this.createWebPage(data);
        webPage.open();
    };
    AppApiView.prototype.openWindow = function (data) {
        var webPage = this.createWebPage(data);
        webPage.openWindow();
    };
    AppApiView.prototype.createWebPage = function (data) {
        var urlBuilder = this.getUrl(data);
        return new WebPage_1.WebPage(urlBuilder);
    };
    return AppApiView;
}());
exports.AppApiView = AppApiView;
//# sourceMappingURL=AppApiView.js.map