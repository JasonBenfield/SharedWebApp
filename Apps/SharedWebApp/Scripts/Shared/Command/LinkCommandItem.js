"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkCommandItem = void 0;
var tslib_1 = require("tslib");
var ContextualClass_1 = require("../ContextualClass");
var FaIcon_1 = require("../FaIcon");
var MarginCss_1 = require("../MarginCss");
var TextSpanView_1 = require("../Html/TextSpanView");
var LinkView_1 = require("../Html/LinkView");
var LinkViewModel_1 = require("../Html/LinkViewModel");
var LinkCommandItem = /** @class */ (function (_super) {
    tslib_1.__extends(LinkCommandItem, _super);
    function LinkCommandItem(vm) {
        if (vm === void 0) { vm = new LinkViewModel_1.LinkViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.executeRequested = _this.clicked;
        _this.active = '';
        _this.isOutline = false;
        _this.icon = new FaIcon_1.FaIcon().addToContainer(_this);
        _this.icon.setMargin(MarginCss_1.MarginCss.end(1));
        _this.textSpan = new TextSpanView_1.TextSpanView().addToContainer(_this);
        _this.addCssName('btn');
        _this.setContext(ContextualClass_1.ContextualClass.default);
        return _this;
    }
    LinkCommandItem.prototype.positionIconRight = function () {
        this.icon.pullRight();
        this.icon.setMargin(MarginCss_1.MarginCss.start(1));
    };
    LinkCommandItem.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    LinkCommandItem.prototype.setActive = function () {
        this.updateActiveCss('active');
    };
    LinkCommandItem.prototype.setInactive = function () {
        this.updateActiveCss('');
    };
    LinkCommandItem.prototype.updateActiveCss = function (active) {
        this.replaceCssName(this.active, active);
        this.active = active;
    };
    LinkCommandItem.prototype.setContext = function (context) {
        var contextCss = this.getContextCss(context, this.isOutline);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.context = context;
    };
    LinkCommandItem.prototype.getContextCss = function (context, isOutline) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    };
    LinkCommandItem.prototype.useOutlineStyle = function () {
        var contextCss = this.getContextCss(this.context, true);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.isOutline = true;
    };
    return LinkCommandItem;
}(LinkView_1.LinkView));
exports.LinkCommandItem = LinkCommandItem;
//# sourceMappingURL=LinkCommandItem.js.map