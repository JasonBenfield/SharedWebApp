"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInputFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var InputFormGroup_1 = require("./InputFormGroup");
var TextToDateViewValue_1 = require("./TextToDateViewValue");
var DateInputFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(DateInputFormGroup, _super);
    function DateInputFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view, new TextToDateViewValue_1.TextToDateViewValue()) || this;
        _this.constraints = new ConstraintCollection_1.DateConstraintCollection();
        _this.view.input.setType('date');
        return _this;
    }
    DateInputFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return DateInputFormGroup;
}(InputFormGroup_1.InputFormGroup));
exports.DateInputFormGroup = DateInputFormGroup;
//# sourceMappingURL=DateInputFormGroup.js.map