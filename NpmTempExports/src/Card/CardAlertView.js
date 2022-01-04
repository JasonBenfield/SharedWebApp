"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardAlertView = void 0;
var tslib_1 = require("tslib");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var MessageAlertView_1 = require("../MessageAlertView");
var CardAlertView = /** @class */ (function (_super) {
    tslib_1.__extends(CardAlertView, _super);
    function CardAlertView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.alert = _this.addContent(new MessageAlertView_1.MessageAlertView());
        _this.addCssName('card-body');
        _this.hide();
        return _this;
    }
    return CardAlertView;
}(Block_1.Block));
exports.CardAlertView = CardAlertView;
//# sourceMappingURL=CardAlertView.js.map