"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading1View = void 0;
var tslib_1 = require("tslib");
var Heading1_1 = require("./Heading1");
var Heading1ViewModel_1 = require("./Heading1ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading1View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading1View, _super);
    function TextHeading1View(vm) {
        if (vm === void 0) { vm = new Heading1ViewModel_1.Heading1ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading1View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading1View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading1View;
}(Heading1_1.Heading1));
exports.TextHeading1View = TextHeading1View;
//# sourceMappingURL=TextHeading1View.js.map