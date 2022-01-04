"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResourceUrl = void 0;
var XtiPath_1 = require("./XtiPath");
var UrlBuilder_1 = require("../UrlBuilder");
var AppVersionDomain_1 = require("./AppVersionDomain");
var AppResourceUrl = /** @class */ (function () {
    function AppResourceUrl(baseUrl, path, cacheBust) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.cacheBust = cacheBust;
        this.url = new UrlBuilder_1.UrlBuilder(baseUrl)
            .addPart(path.format())
            .addQuery('cacheBust', cacheBust)
            .url;
    }
    AppResourceUrl.app = function (appName, modifier, cacheBust) {
        var appVersionDomain = new AppVersionDomain_1.AppVersionDomain().value(appName);
        return new AppResourceUrl("https://" + appVersionDomain.Domain + "/", XtiPath_1.XtiPath.app(appName, appVersionDomain.Version, modifier), cacheBust);
    };
    Object.defineProperty(AppResourceUrl.prototype, "relativeUrl", {
        get: function () {
            return new UrlBuilder_1.UrlBuilder("/" + this.path.format());
        },
        enumerable: false,
        configurable: true
    });
    AppResourceUrl.prototype.withGroup = function (group) {
        return new AppResourceUrl(this.baseUrl, this.path.withGroup(group), this.cacheBust);
    };
    AppResourceUrl.prototype.withAction = function (action) {
        return new AppResourceUrl(this.baseUrl, this.path.withAction(action), this.cacheBust);
    };
    AppResourceUrl.prototype.withModifier = function (modifier) {
        return new AppResourceUrl(this.baseUrl, this.path.withModifier(modifier), this.cacheBust);
    };
    AppResourceUrl.prototype.toString = function () {
        return this.url.value();
    };
    return AppResourceUrl;
}());
exports.AppResourceUrl = AppResourceUrl;
//# sourceMappingURL=AppResourceUrl.js.map