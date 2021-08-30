"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Startup = void 0;
var tslib_1 = require("tslib");
var BaseStartup_1 = require("./BaseStartup");
var Startup = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Startup, _super);
    function Startup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Startup.prototype.getDefaultApi = function () {
        return null;
    };
    return Startup;
}(BaseStartup_1.BaseStartup));
exports.Startup = Startup;
//# sourceMappingURL=Startup.js.map