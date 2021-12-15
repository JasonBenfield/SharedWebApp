"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading4 = void 0;
var tslib_1 = require("tslib");
var Heading4_1 = require("./Heading4");
var Heading4ViewModel_1 = require("./Heading4ViewModel");
var TextSpan_1 = require("./TextSpan");
var TextHeading4 = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading4, _super);
    function TextHeading4(text, vm) {
        if (text === void 0) { text = ''; }
        if (vm === void 0) { vm = new Heading4ViewModel_1.Heading4ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpan_1.TextSpan());
        _this.setText(text);
        return _this;
    }
    TextHeading4.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    return TextHeading4;
}(Heading4_1.Heading4));
exports.TextHeading4 = TextHeading4;
//# sourceMappingURL=TextHeading4.js.map