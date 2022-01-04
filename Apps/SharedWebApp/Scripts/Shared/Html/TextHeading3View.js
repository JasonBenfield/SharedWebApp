"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading3View = void 0;
var tslib_1 = require("tslib");
var Heading3_1 = require("./Heading3");
var Heading3ViewModel_1 = require("./Heading3ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading3View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading3View, _super);
    function TextHeading3View(vm) {
        if (vm === void 0) { vm = new Heading3ViewModel_1.Heading3ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading3View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading3View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading3View;
}(Heading3_1.Heading3));
exports.TextHeading3View = TextHeading3View;
//# sourceMappingURL=TextHeading3View.js.map