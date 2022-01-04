"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextValueFormGroup = void 0;
var tslib_1 = require("tslib");
var FormGroup_1 = require("./FormGroup");
var TextBlock_1 = require("./TextBlock");
var TextValueFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(TextValueFormGroup, _super);
    function TextValueFormGroup(view) {
        var _this = _super.call(this, view) || this;
        _this.valueText = new TextBlock_1.TextBlock('', view.valueText);
        return _this;
    }
    TextValueFormGroup.prototype.getValue = function () {
        return this.value;
    };
    TextValueFormGroup.prototype.setValue = function (value) {
        this.value = value;
        this.valueText.setText(value);
    };
    TextValueFormGroup.prototype.syncValueTitleWithText = function (format) {
        this.valueText.syncTitleWithText(format);
    };
    return TextValueFormGroup;
}(FormGroup_1.FormGroup));
exports.TextValueFormGroup = TextValueFormGroup;
//# sourceMappingURL=TextValueFormGroup.js.map