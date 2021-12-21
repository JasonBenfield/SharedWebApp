"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiFactory = void 0;
var AppApiEvents_1 = require("./AppApiEvents");
var ConsoleLog_1 = require("./ConsoleLog");
var HostEnvironment_1 = require("./HostEnvironment");
var AppApiFactory = /** @class */ (function () {
    function AppApiFactory(_defaultApiType, modalError) {
        this._defaultApiType = _defaultApiType;
        this.modalError = modalError;
    }
    AppApiFactory.prototype.api = function (apiCtor) {
        var _this = this;
        var api;
        var events = new AppApiEvents_1.AppApiEvents(function (err) {
            new ConsoleLog_1.ConsoleLog().error(err.toString());
            _this.modalError.show(err.getErrors(), err.getCaption());
        });
        if (apiCtor === this._defaultApiType) {
            api = new apiCtor(events, location.protocol + "//" + location.host, 'Current');
        }
        else {
            var hostEnvironment = new HostEnvironment_1.HostEnvironment();
            api = new apiCtor(events, pageContext.BaseUrl, hostEnvironment.isProduction ? '' : 'Current');
        }
        return api;
    };
    return AppApiFactory;
}());
exports.AppApiFactory = AppApiFactory;
//# sourceMappingURL=AppApiFactory.js.map