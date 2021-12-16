"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInputFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var InputFormGroup_1 = require("./InputFormGroup");
var TextToNumberViewValue_1 = require("./TextToNumberViewValue");
var NumberInputFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(NumberInputFormGroup, _super);
    function NumberInputFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view, new TextToNumberViewValue_1.TextToNumberViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.NumberConstraintCollection();
        return _this;
    }
    NumberInputFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return NumberInputFormGroup;
}(InputFormGroup_1.InputFormGroup));
exports.NumberInputFormGroup = NumberInputFormGroup;
//# sourceMappingURL=NumberInputFormGroup.js.map