"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading3 = void 0;
var tslib_1 = require("tslib");
var Heading3_1 = require("./Heading3");
var Heading3ViewModel_1 = require("./Heading3ViewModel");
var TextSpan_1 = require("./TextSpan");
var TextHeading3 = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading3, _super);
    function TextHeading3(text, vm) {
        if (text === void 0) { text = ''; }
        if (vm === void 0) { vm = new Heading3ViewModel_1.Heading3ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpan_1.TextSpan());
        _this.setText(text);
        return _this;
    }
    TextHeading3.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    return TextHeading3;
}(Heading3_1.Heading3));
exports.TextHeading3 = TextHeading3;
//# sourceMappingURL=TextHeading3.js.map