"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading4View = void 0;
var tslib_1 = require("tslib");
var Heading4_1 = require("./Heading4");
var Heading4ViewModel_1 = require("./Heading4ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading4View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading4View, _super);
    function TextHeading4View(vm) {
        if (vm === void 0) { vm = new Heading4ViewModel_1.Heading4ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading4View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading4View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading4View;
}(Heading4_1.Heading4));
exports.TextHeading4View = TextHeading4View;
//# sourceMappingURL=TextHeading4View.js.map