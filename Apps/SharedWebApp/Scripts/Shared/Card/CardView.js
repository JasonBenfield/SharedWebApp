"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardView = void 0;
var tslib_1 = require("tslib");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var ListBlockViewModel_1 = require("../Html/ListBlockViewModel");
var ListGroupView_1 = require("../ListGroup/ListGroupView");
var CardAlertView_1 = require("./CardAlertView");
var CardHeader_1 = require("./CardHeader");
var CardTitleHeaderView_1 = require("./CardTitleHeaderView");
var CardView = /** @class */ (function (_super) {
    tslib_1.__extends(CardView, _super);
    function CardView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.addCssName('card');
        return _this;
    }
    CardView.prototype.addCardTitleHeader = function () {
        return this.addContent(new CardTitleHeaderView_1.CardTitleHeaderView());
    };
    CardView.prototype.addCardHeader = function () {
        return this.addContent(new CardHeader_1.CardHeader());
    };
    CardView.prototype.addCardAlert = function () {
        return this.addContent(new CardAlertView_1.CardAlertView());
    };
    CardView.prototype.addCardBody = function () {
        var body = this.addContent(new Block_1.Block());
        body.addCssName('card-body');
        return body;
    };
    CardView.prototype.addBlockListGroup = function (createItemView) {
        if (createItemView === void 0) { createItemView = null; }
        var listGroup = this.addContent(new ListGroupView_1.ListGroupView(createItemView, new ListBlockViewModel_1.ListBlockViewModel()));
        listGroup.makeFlush();
        return listGroup;
    };
    CardView.prototype.addUnorderedListGroup = function (createItemView) {
        if (createItemView === void 0) { createItemView = null; }
        var listGroup = this.addContent(new ListGroupView_1.ListGroupView(createItemView));
        listGroup.makeFlush();
        return listGroup;
    };
    return CardView;
}(Block_1.Block));
exports.CardView = CardView;
//# sourceMappingURL=CardView.js.map