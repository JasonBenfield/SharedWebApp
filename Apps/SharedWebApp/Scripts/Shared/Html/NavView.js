"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavView = void 0;
var tslib_1 = require("tslib");
var HtmlContainerComponent_1 = require("./HtmlContainerComponent");
var NavLinkView_1 = require("./NavLinkView");
var NavViewModel_1 = require("./NavViewModel");
var NavView = /** @class */ (function (_super) {
    tslib_1.__extends(NavView, _super);
    function NavView(vm) {
        if (vm === void 0) { vm = new NavViewModel_1.NavViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.addCssName('nav');
        return _this;
    }
    NavView.prototype.pills = function () {
        this.addCssName('nav-pills');
    };
    NavView.prototype.justified = function () {
        this.addCssName('nav-justified');
    };
    NavView.prototype.setFlexCss = function (flexCss) {
        this.replaceCssName(this.flexCss && this.flexCss.cssClass().toString(), flexCss && flexCss.cssClass().toString());
        this.flexCss = flexCss;
    };
    NavView.prototype.addLink = function () {
        var link = this.addContent(new NavLinkView_1.NavLinkView());
        return link;
    };
    return NavView;
}(HtmlContainerComponent_1.HtmlContainerComponent));
exports.NavView = NavView;
//# sourceMappingURL=NavView.js.map