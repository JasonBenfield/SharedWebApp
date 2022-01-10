"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroupView = void 0;
var tslib_1 = require("tslib");
var UnorderedListViewModel_1 = require("../Html/UnorderedListViewModel");
var BaseListGroupView_1 = require("./BaseListGroupView");
var ButtonListGroupItemView_1 = require("./ButtonListGroupItemView");
var LinkListGroupItemView_1 = require("./LinkListGroupItemView");
var ListGroupItemView_1 = require("./ListGroupItemView");
var ListGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(ListGroupView, _super);
    function ListGroupView(createItemView, vm) {
        if (vm === void 0) { vm = new UnorderedListViewModel_1.UnorderedListViewModel(); }
        return _super.call(this, createItemView, vm) || this;
    }
    ListGroupView.prototype.addButtonListGroupItem = function () {
        return this.addListItemView(new ButtonListGroupItemView_1.ButtonListGroupItemView());
    };
    ListGroupView.prototype.addLinkListGroupItem = function () {
        return this.addListItemView(new LinkListGroupItemView_1.LinkListGroupItemView());
    };
    ListGroupView.prototype.addListGroupItem = function () {
        return this.addListItemView(new ListGroupItemView_1.ListGroupItemView());
    };
    return ListGroupView;
}(BaseListGroupView_1.BaseListGroupView));
exports.ListGroupView = ListGroupView;
//# sourceMappingURL=ListGroupView.js.map