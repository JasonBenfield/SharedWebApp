"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var InputFormGroup_1 = require("./InputFormGroup");
var TextToTextViewValue_1 = require("./TextToTextViewValue");
var TextInputFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(TextInputFormGroup, _super);
    function TextInputFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view, new TextToTextViewValue_1.TextToTextViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.TextConstraintCollection();
        return _this;
    }
    TextInputFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return TextInputFormGroup;
}(InputFormGroup_1.InputFormGroup));
exports.TextInputFormGroup = TextInputFormGroup;
//# sourceMappingURL=TextInputFormGroup.js.map