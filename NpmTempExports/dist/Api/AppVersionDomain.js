"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersionDomain = void 0;
var Enumerable_1 = require("../Enumerable");
var AppVersionDomain = /** @class */ (function () {
    function AppVersionDomain() {
    }
    AppVersionDomain.prototype.value = function (app) {
        var domain = new Enumerable_1.First(new Enumerable_1.FilteredArray(pageContext.WebAppDomains, function (d) { return d.App.toLowerCase() === app.toLowerCase(); })).value();
        return domain || { App: '', Version: '', Domain: '' };
    };
    return AppVersionDomain;
}());
exports.AppVersionDomain = AppVersionDomain;
//# sourceMappingURL=AppVersionDomain.js.map