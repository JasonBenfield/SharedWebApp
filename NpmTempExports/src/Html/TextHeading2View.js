"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading2View = void 0;
var tslib_1 = require("tslib");
var Heading2_1 = require("./Heading2");
var Heading2ViewModel_1 = require("./Heading2ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading2View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading2View, _super);
    function TextHeading2View(vm) {
        if (vm === void 0) { vm = new Heading2ViewModel_1.Heading2ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading2View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading2View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading2View;
}(Heading2_1.Heading2));
exports.TextHeading2View = TextHeading2View;
//# sourceMappingURL=TextHeading2View.js.map