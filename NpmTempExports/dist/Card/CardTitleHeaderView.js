"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTitleHeaderView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var TextBlockView_1 = require("../Html/TextBlockView");
var CardHeaderView_1 = require("./CardHeaderView");
var CardTitleHeaderView = /** @class */ (function (_super) {
    tslib_1.__extends(CardTitleHeaderView, _super);
    function CardTitleHeaderView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textBlock = _this.addContent(new TextBlockView_1.TextBlockView());
        return _this;
    }
    CardTitleHeaderView.prototype.setText = function (text) {
        this.textBlock.setText(text);
    };
    return CardTitleHeaderView;
}(CardHeaderView_1.CardHeaderView));
exports.CardTitleHeaderView = CardTitleHeaderView;
//# sourceMappingURL=CardTitleHeaderView.js.map