"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCardView = void 0;
var tslib_1 = require("tslib");
var CardView_1 = require("../../Shared/Card/CardView");
var BlockViewModel_1 = require("../../Shared/Html/BlockViewModel");
var TestClickableItemView_1 = require("./TestClickableItemView");
var TestListItemView_1 = require("./TestListItemView");
var TestCardView = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TestCardView, _super);
    function TestCardView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.cardTitleHeader = _this.addCardTitleHeader();
        _this.alert = _this.addCardAlert().alert;
        _this.testItems = _this.addUnorderedListGroup(function () { return new TestListItemView_1.TestListItemView(); });
        _this.clickableItems = _this.addBlockListGroup(function () { return new TestClickableItemView_1.TestClickableListItemView(); });
        return _this;
    }
    return TestCardView;
}(CardView_1.CardView));
exports.TestCardView = TestCardView;
//# sourceMappingURL=TestCardView.js.map