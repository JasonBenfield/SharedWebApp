"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkView = void 0;
var tslib_1 = require("tslib");
var AggregateComponent_1 = require("./AggregateComponent");
var HtmlContainerComponent_1 = require("./HtmlContainerComponent");
var LinkViewModel_1 = require("./LinkViewModel");
var LinkView = /** @class */ (function (_super) {
    tslib_1.__extends(LinkView, _super);
    function LinkView(vm) {
        if (vm === void 0) { vm = new LinkViewModel_1.LinkViewModel(); }
        var _this = _super.call(this, vm, new AggregateComponent_1.AggregateComponent(vm.content)) || this;
        _this.clicked = _this.vm.clicked;
        return _this;
    }
    LinkView.prototype.setHref = function (href) {
        this.vm.href(href);
    };
    LinkView.prototype.enable = function () {
        this.vm.isEnabled(true);
    };
    LinkView.prototype.disable = function () {
        this.vm.isEnabled(false);
    };
    return LinkView;
}(HtmlContainerComponent_1.HtmlContainerComponent));
exports.LinkView = LinkView;
//# sourceMappingURL=LinkView.js.map