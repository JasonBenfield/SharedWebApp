"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkListGroupItemView = void 0;
var tslib_1 = require("tslib");
var LinkView_1 = require("../Html/LinkView");
var LinkListItemViewModel_1 = require("./LinkListItemViewModel");
var ListGroupItemView_1 = require("./ListGroupItemView");
var LinkListGroupItemView = /** @class */ (function (_super) {
    tslib_1.__extends(LinkListGroupItemView, _super);
    function LinkListGroupItemView(vm) {
        if (vm === void 0) { vm = new LinkListItemViewModel_1.LinkListItemViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.link = new LinkView_1.LinkView(vm);
        return _this;
    }
    LinkListGroupItemView.prototype.setHref = function (href) {
        this.link.setHref(href);
    };
    LinkListGroupItemView.prototype.enable = function () {
        this.link.enable();
    };
    LinkListGroupItemView.prototype.disable = function () {
        this.link.disable();
    };
    return LinkListGroupItemView;
}(ListGroupItemView_1.ListGroupItemView));
exports.LinkListGroupItemView = LinkListGroupItemView;
//# sourceMappingURL=LinkListGroupItemView.js.map