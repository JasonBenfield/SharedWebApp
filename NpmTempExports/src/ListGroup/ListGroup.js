"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroup = void 0;
var Enumerable_1 = require("../Enumerable");
var Events_1 = require("../Events");
var ListItemWithView = /** @class */ (function () {
    function ListItemWithView(listItem, view) {
        this.listItem = listItem;
        this.view = view;
    }
    return ListItemWithView;
}());
var ListGroup = /** @class */ (function () {
    function ListGroup(view) {
        this.view = view;
        this.itemsWithView = [];
        this._itemClicked = new Events_1.DefaultEvent(this);
        this.itemClicked = this._itemClicked.handler();
        this.view.itemClicked.register(this.onItemClicked.bind(this));
    }
    ListGroup.prototype.onItemClicked = function (itemVM) {
        var item = new Enumerable_1.First(new Enumerable_1.FilteredArray(this.itemsWithView, function (itemWithView) { return itemWithView.view === itemVM; })).value();
        this._itemClicked.invoke(item && item.listItem);
    };
    ListGroup.prototype.clearItems = function () {
        for (var _i = 0, _a = this.itemsWithView; _i < _a.length; _i++) {
            var itemWithView = _a[_i];
            itemWithView.view.removeFromList(this.view);
        }
        this.itemsWithView.splice(0, this.itemsWithView.length);
    };
    ListGroup.prototype.addItem = function (sourceItem, createItem) {
        var itemView = this.view.createItemView(sourceItem);
        var item = createItem(sourceItem, itemView);
        this.itemsWithView.push(new ListItemWithView(item, itemView));
        itemView.addToList(this.view);
        return item;
    };
    ListGroup.prototype.setItems = function (sourceItems, createItem) {
        this.clearItems();
        var items = [];
        for (var _i = 0, sourceItems_1 = sourceItems; _i < sourceItems_1.length; _i++) {
            var sourceItem = sourceItems_1[_i];
            var item = this.addItem(sourceItem, createItem);
            items.push(item);
        }
        return items;
    };
    return ListGroup;
}());
exports.ListGroup = ListGroup;
//# sourceMappingURL=ListGroup.js.map