"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListView = void 0;
var tslib_1 = require("tslib");
var Events_1 = require("../Events");
var HtmlComponent_1 = require("../Html/HtmlComponent");
var UnorderedListViewModel_1 = require("../Html/UnorderedListViewModel");
var BaseListView = /** @class */ (function (_super) {
    tslib_1.__extends(BaseListView, _super);
    function BaseListView(createItemView, vm) {
        if (vm === void 0) { vm = new UnorderedListViewModel_1.UnorderedListViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.createItemView = createItemView;
        _this.items = [];
        _this._itemClicked = new Events_1.DefaultEvent(_this);
        _this.itemClicked = _this._itemClicked.handler();
        _this.vm.itemClicked.register(_this.onItemClicked.bind(_this));
        return _this;
    }
    BaseListView.prototype.onItemClicked = function (itemVM) {
        var index = this.vm.items.indexOf(itemVM);
        if (index >= 0) {
            this._itemClicked.invoke(this.items[index]);
        }
    };
    BaseListView.prototype.addItem = function (itemView) {
        itemView.addToList(this);
    };
    BaseListView.prototype.removeFromListItem = function (itemVM, item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        this.vm.items.remove(itemVM);
        this.vm.hasItems(this.items.length > 0);
    };
    BaseListView.prototype.addFromListItem = function (itemVM, item) {
        this.vm.items.push(itemVM);
        this.vm.hasItems(true);
        this.items.push(item);
    };
    return BaseListView;
}(HtmlComponent_1.HtmlComponent));
exports.BaseListView = BaseListView;
//# sourceMappingURL=BaseListView.js.map