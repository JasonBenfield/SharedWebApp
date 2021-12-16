"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroupView = void 0;
var tslib_1 = require("tslib");
var UnorderedListViewModel_1 = require("../Html/UnorderedListViewModel");
var BaseListGroupView_1 = require("./BaseListGroupView");
var ListGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(ListGroupView, _super);
    function ListGroupView(createItemView, vm) {
        if (vm === void 0) { vm = new UnorderedListViewModel_1.UnorderedListViewModel(); }
        return _super.call(this, createItemView, vm) || this;
    }
    return ListGroupView;
}(BaseListGroupView_1.BaseListGroupView));
exports.ListGroupView = ListGroupView;
//# sourceMappingURL=ListGroupView.js.map