"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Startup = void 0;
var PageFrameView_1 = require("./PageFrameView");
var Startup = /** @class */ (function () {
    function Startup() {
    }
    Startup.prototype.build = function () {
        var pageFrame = new PageFrameView_1.PageFrameView();
        pageFrame.load();
        return pageFrame;
    };
    return Startup;
}());
exports.Startup = Startup;
//# sourceMappingURL=Startup.js.map