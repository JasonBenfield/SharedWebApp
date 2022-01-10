"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCard = void 0;
var DelayedAction_1 = require("../../Shared/DelayedAction");
var Enumerable_1 = require("../../Shared/Enumerable");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var ListGroup_1 = require("../../Shared/ListGroup/ListGroup");
var CardAlert_1 = require("../../Shared/Card/CardAlert");
var TestClickableItem_1 = require("./TestClickableItem");
var TestListItem_1 = require("./TestListItem");
var TestCard = /** @class */ (function () {
    function TestCard(view) {
        this.view = view;
        this.cardTitleHeader = new TextBlock_1.TextBlock('Original Title', this.view.cardTitleHeader);
        this.alert = new CardAlert_1.CardAlert(this.view.alert).alert;
        this.cardTitleHeader.setText('This is the Title');
        new TextBlock_1.TextBlock('Test List Item', view.manualItem);
        this.testItems = new ListGroup_1.ListGroup(this.view.testItems);
        this.clickableItems = new ListGroup_1.ListGroup(this.view.clickableItems);
        this.testItems.setItems(new Enumerable_1.EnumerableRange(1, 5).value(), function (i, listItem) { return new TestListItem_1.TestListItem(i, listItem); });
        this.testItems.addItem(6, function (i, listItem) { return new TestListItem_1.TestListItem(i, listItem); });
        this.clickableItems.setItems(new Enumerable_1.EnumerableRange(1, 5).value(), function (i, listItem) { return new TestClickableItem_1.TestClickableListItem(i, listItem); });
        this.clickableItems.itemClicked.register(this.onClick.bind(this));
    }
    TestCard.prototype.onClick = function (listItem) {
        alert("You clicked " + listItem.i);
    };
    TestCard.prototype.refresh = function () {
        var _this = this;
        return this.alert.infoAction('Loading...', function () {
            _this.testItems.setItems(new Enumerable_1.EnumerableRange(6, 4).value(), function (i, listItem) { return new TestListItem_1.TestListItem(i, listItem); });
            _this.clickableItems.setItems(new Enumerable_1.EnumerableRange(10, 6).value(), function (i, listItem) { return new TestClickableItem_1.TestClickableListItem(i, listItem); });
            return new DelayedAction_1.DelayedAction(function () { }, 5000).execute();
        });
    };
    return TestCard;
}());
exports.TestCard = TestCard;
//# sourceMappingURL=TestCard.js.map