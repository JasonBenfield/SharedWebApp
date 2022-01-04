"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextHeading6View = void 0;
var tslib_1 = require("tslib");
var Heading6_1 = require("./Heading6");
var Heading6ViewModel_1 = require("./Heading6ViewModel");
var TextSpanView_1 = require("./TextSpanView");
var TextHeading6View = /** @class */ (function (_super) {
    tslib_1.__extends(TextHeading6View, _super);
    function TextHeading6View(vm) {
        if (vm === void 0) { vm = new Heading6ViewModel_1.Heading6ViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.textSpan = _this.addContent(new TextSpanView_1.TextSpanView());
        return _this;
    }
    TextHeading6View.prototype.setText = function (text) { this.textSpan.setText(text); };
    TextHeading6View.prototype.setTitle = function (title) { this.textSpan.setTitle(title); };
    return TextHeading6View;
}(Heading6_1.Heading6));
exports.TextHeading6View = TextHeading6View;
//# sourceMappingURL=TextHeading6View.js.map