"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonListGroupItemView = void 0;
var tslib_1 = require("tslib");
var Button_1 = require("../Html/Button");
var ButtonListItemViewModel_1 = require("./ButtonListItemViewModel");
var ListGroupItemView_1 = require("./ListGroupItemView");
var ButtonListGroupItemView = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonListGroupItemView, _super);
    function ButtonListGroupItemView(vm) {
        if (vm === void 0) { vm = new ButtonListItemViewModel_1.ButtonListItemViewModel(); }
        var _this = _super.call(this, vm) || this;
        var css = vm.css();
        _this.button = new Button_1.Button(vm);
        _this.button.clearCss();
        _this.button.addCssName(css);
        _this.clicked = _this.button.clicked;
        return _this;
    }
    ButtonListGroupItemView.prototype.enable = function () {
        this.button.enable();
    };
    ButtonListGroupItemView.prototype.disable = function () {
        this.button.disable();
    };
    return ButtonListGroupItemView;
}(ListGroupItemView_1.ListGroupItemView));
exports.ButtonListGroupItemView = ButtonListGroupItemView;
//# sourceMappingURL=ButtonListGroupItemView.js.map