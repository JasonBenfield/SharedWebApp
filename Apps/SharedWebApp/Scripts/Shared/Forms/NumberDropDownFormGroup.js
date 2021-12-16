"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberDropDownFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var DropDownFormGroup_1 = require("./DropDownFormGroup");
var NumberDropDownFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(NumberDropDownFormGroup, _super);
    function NumberDropDownFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.constraints = new ConstraintCollection_1.NumberConstraintCollection();
        return _this;
    }
    NumberDropDownFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return NumberDropDownFormGroup;
}(DropDownFormGroup_1.DropDownFormGroup));
exports.NumberDropDownFormGroup = NumberDropDownFormGroup;
//# sourceMappingURL=NumberDropDownFormGroup.js.map