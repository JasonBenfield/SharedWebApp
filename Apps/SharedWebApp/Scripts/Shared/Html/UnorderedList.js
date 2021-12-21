"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnorderedList = void 0;
var tslib_1 = require("tslib");
var BaseListView_1 = require("../ListGroup/BaseListView");
var ListItem_1 = require("./ListItem");
var UnorderedListViewModel_1 = require("./UnorderedListViewModel");
var UnorderedList = /** @class */ (function (_super) {
    tslib_1.__extends(UnorderedList, _super);
    function UnorderedList(createItemView, vm) {
        if (createItemView === void 0) { createItemView = (function (itemVM) { return new ListItem_1.ListItem(itemVM); }); }
        if (vm === void 0) { vm = new UnorderedListViewModel_1.UnorderedListViewModel(); }
        return _super.call(this, createItemView, vm) || this;
    }
    return UnorderedList;
}(BaseListView_1.BaseListView));
exports.UnorderedList = UnorderedList;
//# sourceMappingURL=UnorderedList.js.map