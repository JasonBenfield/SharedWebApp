"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownComponent = void 0;
var ListItem_1 = require("../Html/ListItem");
var UnorderedList_1 = require("../Html/UnorderedList");
var DropdownButton_1 = require("./DropdownButton");
var DropdownComponentViewModel_1 = require("./DropdownComponentViewModel");
var DropdownLinkItem_1 = require("./DropdownLinkItem");
var DropdownSpanItem_1 = require("./DropdownSpanItem");
var DropdownComponent = /** @class */ (function () {
    function DropdownComponent(createItemView, vm) {
        if (createItemView === void 0) { createItemView = (function () { return new ListItem_1.ListItem(); }); }
        if (vm === void 0) { vm = new DropdownComponentViewModel_1.DropdownComponentViewModel(); }
        this.createItemView = createItemView;
        this.vm = vm;
        this.button = new DropdownButton_1.DropdownButton(this.vm.button);
        this.menu = new UnorderedList_1.UnorderedList(this.createItemView, this.vm.menu);
        this.menu.addCssName('dropdown-menu dropdown-menu-right');
    }
    DropdownComponent.prototype.addToContainer = function (container) {
        return container.addItem(this.vm, this);
    };
    DropdownComponent.prototype.insertIntoContainer = function (container, index) {
        return container.insertItem(index, this.vm, this);
    };
    DropdownComponent.prototype.removeFromContainer = function (container) {
        return container.removeItem(this);
    };
    DropdownComponent.prototype.addSpanItem = function () {
        return new DropdownSpanItem_1.DropdownSpanItem().addToList(this.menu);
    };
    DropdownComponent.prototype.addLinkItem = function () {
        return new DropdownLinkItem_1.DropdownLinkItem().addToList(this.menu);
    };
    DropdownComponent.prototype.show = function () {
        this.vm.isVisible(true);
    };
    DropdownComponent.prototype.hide = function () {
        this.vm.isVisible(false);
    };
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=DropdownComponent.js.map