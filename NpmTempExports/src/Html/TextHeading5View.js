"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading5View = void 0;
var tslib_1 = require("tslib");
var Heading5_1 = require("./Heading5");
var Heading5ViewModel_1 = require("./Heading5ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading5View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading5View, _super);
    function TextHeading5View(vm) {
        if (vm === void 0) { vm = new Heading5ViewModel_1.Heading5ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading5View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading5View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading5View;
}(Heading5_1.Heading5));
exports.TextHeading5View = TextHeading5View;
//# sourceMappingURL=TextHeading5View.js.map