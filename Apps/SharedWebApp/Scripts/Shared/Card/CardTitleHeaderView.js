"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTitleHeaderView = void 0;
var tslib_1 = require("tslib");
var CardHeader_1 = require("./CardHeader");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var TextBlock_1 = require("../Html/TextBlock");
var CardTitleHeaderView = /** @class */ (function (_super) {
    tslib_1.__extends(CardTitleHeaderView, _super);
    function CardTitleHeaderView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textBlock = _this.addContent(new TextBlock_1.TextBlock());
        return _this;
    }
    CardTitleHeaderView.prototype.setText = function (text) {
        this.textBlock.setText(text);
    };
    return CardTitleHeaderView;
}(CardHeader_1.CardHeader));
exports.CardTitleHeaderView = CardTitleHeaderView;
//# sourceMappingURL=CardTitleHeaderView.js.map