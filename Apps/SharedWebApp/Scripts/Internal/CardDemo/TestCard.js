"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCard = void 0;
var tslib_1 = require("tslib");
var Card_1 = require("../../Shared/Card/Card");
var DelayedAction_1 = require("../../Shared/DelayedAction");
var Row_1 = require("../../Shared/Grid/Row");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var Enumerable_1 = require("../../Shared/Enumerable");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var BlockViewModel_1 = require("../../Shared/Html/BlockViewModel");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var TestCard = /** @class */ (function (_super) {
    tslib_1.__extends(TestCard, _super);
    function TestCard(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.cardTitleHeader = _this.addCardTitleHeader('Original Title');
        _this.alert = _this.addCardAlert().alert;
        _this.testItems = _this.addListGroup();
        _this.clickableItems = _this.addButtonListGroup();
        _this.cardTitleHeader.setText('This is the Title');
        _this.testItems.setItems(new Enumerable_1.EnumerableRange(1, 5).value(), function (i, listItem) {
            var textBlock = listItem.addContent(new TextBlock_1.TextBlock());
            textBlock.setText("Test " + i);
        });
        _this.clickableItems.setItems(new Enumerable_1.EnumerableRange(1, 5).value(), function (i, listItem) {
            var row = listItem.addContent(new Row_1.Row(vm));
            var iconColumn = row.addIconColumn('thumbs-up', function (icon) {
                icon.makeFixedWidth();
                icon.setColor(ContextualClass_1.ContextualClass.success);
            });
            iconColumn.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
            row.addTextColumn("Clickable " + i);
        });
        return _this;
    }
    TestCard.prototype.refresh = function () {
        return this.alert.infoAction('Loading...', function () { return new DelayedAction_1.DelayedAction(function () { }, 5000).execute(); });
    };
    return TestCard;
}(Card_1.Card));
exports.TestCard = TestCard;
//# sourceMappingURL=TestCard.js.map