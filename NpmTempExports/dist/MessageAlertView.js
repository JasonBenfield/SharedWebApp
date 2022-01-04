"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAlertView = void 0;
var tslib_1 = require("tslib");
var Alert_1 = require("./Alert");
var Block_1 = require("./Html/Block");
var BlockViewModel_1 = require("./Html/BlockViewModel");
var TextBlockView_1 = require("./Html/TextBlockView");
var MessageAlertView = /** @class */ (function (_super) {
    tslib_1.__extends(MessageAlertView, _super);
    function MessageAlertView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.alert = new Alert_1.Alert(_this.vm);
        _this.textBlock = new TextBlockView_1.TextBlockView().addToContainer(_this.alert.content);
        _this.addCssName('alert');
        return _this;
    }
    MessageAlertView.prototype.setContext = function (context) {
        this.alert.setContext(context);
    };
    return MessageAlertView;
}(Block_1.Block));
exports.MessageAlertView = MessageAlertView;
//# sourceMappingURL=MessageAlertView.js.map