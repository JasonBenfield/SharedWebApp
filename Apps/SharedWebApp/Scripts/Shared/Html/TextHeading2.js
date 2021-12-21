"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading2 = void 0;
var tslib_1 = require("tslib");
var Heading2_1 = require("./Heading2");
var Heading2ViewModel_1 = require("./Heading2ViewModel");
var TextSpan_1 = require("./TextSpan");
var TextHeading2 = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading2, _super);
    function TextHeading2(text, vm) {
        if (text === void 0) { text = ''; }
        if (vm === void 0) { vm = new Heading2ViewModel_1.Heading2ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpan_1.TextSpan());
        _this.setText(text);
        return _this;
    }
    TextHeading2.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    return TextHeading2;
}(Heading2_1.Heading2));
exports.TextHeading2 = TextHeading2;
//# sourceMappingURL=TextHeading2.js.map