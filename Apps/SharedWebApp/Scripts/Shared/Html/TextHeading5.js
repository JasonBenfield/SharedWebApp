"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading5 = void 0;
var tslib_1 = require("tslib");
var Heading5_1 = require("./Heading5");
var Heading5ViewModel_1 = require("./Heading5ViewModel");
var TextSpan_1 = require("./TextSpan");
var TextHeading5 = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading5, _super);
    function TextHeading5(text, vm) {
        if (text === void 0) { text = ''; }
        if (vm === void 0) { vm = new Heading5ViewModel_1.Heading5ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpan_1.TextSpan());
        _this.setText(text);
        return _this;
    }
    TextHeading5.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    return TextHeading5;
}(Heading5_1.Heading5));
exports.TextHeading5 = TextHeading5;
//# sourceMappingURL=TextHeading5.js.map