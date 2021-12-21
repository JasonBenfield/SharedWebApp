"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading6 = void 0;
var tslib_1 = require("tslib");
var Heading6_1 = require("./Heading6");
var Heading6ViewModel_1 = require("./Heading6ViewModel");
var TextSpan_1 = require("./TextSpan");
var TextHeading6 = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading6, _super);
    function TextHeading6(text, vm) {
        if (text === void 0) { text = ''; }
        if (vm === void 0) { vm = new Heading6ViewModel_1.Heading6ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpan_1.TextSpan());
        _this.setText(text);
        return _this;
    }
    TextHeading6.prototype.setText = function (text) {
        this.textSpan.setText(text);
    };
    return TextHeading6;
}(Heading6_1.Heading6));
exports.TextHeading6 = TextHeading6;
//# sourceMappingURL=TextHeading6.js.map