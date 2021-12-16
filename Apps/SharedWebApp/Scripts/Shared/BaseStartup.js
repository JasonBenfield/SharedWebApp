"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStartup = void 0;
var PageFrameView_1 = require("./PageFrameView");
var BaseStartup = /** @class */ (function () {
    function BaseStartup() {
    }
    BaseStartup.prototype.build = function () {
        var pageFrame = new PageFrameView_1.PageFrameView();
        pageFrame.load();
        return pageFrame;
    };
    return BaseStartup;
}());
exports.BaseStartup = BaseStartup;
//# sourceMappingURL=BaseStartup.js.map