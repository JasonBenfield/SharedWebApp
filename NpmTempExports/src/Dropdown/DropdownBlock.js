"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownBlock = void 0;
var tslib_1 = require("tslib");
var Block_1 = require("../Html/Block");
var ListItem_1 = require("../Html/ListItem");
var UnorderedList_1 = require("../Html/UnorderedList");
var DropdownBlockViewModel_1 = require("./DropdownBlockViewModel");
var DropdownButton_1 = require("./DropdownButton");
var DropdownLinkItem_1 = require("./DropdownLinkItem");
var DropdownSpanItem_1 = require("./DropdownSpanItem");
var DropdownBlock = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownBlock, _super);
    function DropdownBlock(createItemView, vm) {
        if (createItemView === void 0) { createItemView = (function () { return new ListItem_1.ListItem(); }); }
        if (vm === void 0) { vm = new DropdownBlockViewModel_1.DropdownBlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.createItemView = createItemView;
        _this.button = _this.addContent(new DropdownButton_1.DropdownButton(_this.vm.button));
        _this.menu = _this.addContent(new UnorderedList_1.UnorderedList(_this.createItemView, _this.vm.menu));
        _this.addCssName('dropdown');
        _this.menu.addCssName('dropdown-menu dropdown-menu-right');
        return _this;
    }
    DropdownBlock.prototype.addSpanItem = function () {
        return new DropdownSpanItem_1.DropdownSpanItem().addToList(this.menu);
    };
    DropdownBlock.prototype.addLinkItem = function () {
        return new DropdownLinkItem_1.DropdownLinkItem().addToList(this.menu);
    };
    return DropdownBlock;
}(Block_1.Block));
exports.DropdownBlock = DropdownBlock;
//# sourceMappingURL=DropdownBlock.js.map