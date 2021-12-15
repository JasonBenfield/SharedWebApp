"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalRule = void 0;
var HorizontalRuleViewModel_1 = require("./HorizontalRuleViewModel");
var HorizontalRule = /** @class */ (function () {
    function HorizontalRule(vm) {
        if (vm === void 0) { vm = new HorizontalRuleViewModel_1.HorizontalRuleViewModel(); }
    }
    HorizontalRule.prototype.addToContainer = function (container) {
        return container.addItem(this.vm, this);
    };
    HorizontalRule.prototype.insertIntoContainer = function (container, index) {
        return container.insertItem(index, this.vm, this);
    };
    HorizontalRule.prototype.removeFromContainer = function (container) {
        return container.removeItem(this);
    };
    HorizontalRule.prototype.show = function () {
        this.vm.isVisible(true);
    };
    HorizontalRule.prototype.hide = function () {
        this.vm.isVisible(false);
    };
    return HorizontalRule;
}());
exports.HorizontalRule = HorizontalRule;
//# sourceMappingURL=HorizontalRule.js.map