"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiFactory = void 0;
var ConsoleLog_1 = require("../ConsoleLog");
var AppApiEvents_1 = require("./AppApiEvents");
var AppApiFactory = /** @class */ (function () {
    function AppApiFactory(modalError) {
        this.modalError = modalError;
    }
    AppApiFactory.prototype.api = function (apiCtor) {
        var _this = this;
        var events = new AppApiEvents_1.AppApiEvents(function (err) {
            new ConsoleLog_1.ConsoleLog().error(err.toString());
            _this.modalError.show(err.getErrors(), err.getCaption());
        });
        var api = new apiCtor(events);
        return api;
    };
    return AppApiFactory;
}());
exports.AppApiFactory = AppApiFactory;
//# sourceMappingURL=AppApiFactory.js.map