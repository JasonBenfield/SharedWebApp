"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownLinkItem = void 0;
var tslib_1 = require("tslib");
var LinkView_1 = require("../Html/LinkView");
var ListItem_1 = require("../Html/ListItem");
var ListItemViewModel_1 = require("../Html/ListItemViewModel");
var DropdownLinkItem = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownLinkItem, _super);
    function DropdownLinkItem(vm) {
        if (vm === void 0) { vm = new ListItemViewModel_1.ListItemViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.link = new LinkView_1.LinkView().addToContainer(_this)
            .configure(function (l) {
            l.addCssName('dropdown-item');
        });
        return _this;
    }
    return DropdownLinkItem;
}(ListItem_1.ListItem));
exports.DropdownLinkItem = DropdownLinkItem;
//# sourceMappingURL=DropdownLinkItem.js.map