"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavLinkView = void 0;
var tslib_1 = require("tslib");
var LinkView_1 = require("./LinkView");
var LinkViewModel_1 = require("./LinkViewModel");
var NavLinkView = /** @class */ (function (_super) {
    tslib_1.__extends(NavLinkView, _super);
    function NavLinkView(vm) {
        if (vm === void 0) { vm = new LinkViewModel_1.LinkViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.addCssName('nav-link');
        return _this;
    }
    NavLinkView.prototype.setActive = function () {
        this.addCssName('active');
    };
    NavLinkView.prototype.clearActive = function () {
        this.removeCssName('active');
    };
    return NavLinkView;
}(LinkView_1.LinkView));
exports.NavLinkView = NavLinkView;
//# sourceMappingURL=NavLinkView.js.map