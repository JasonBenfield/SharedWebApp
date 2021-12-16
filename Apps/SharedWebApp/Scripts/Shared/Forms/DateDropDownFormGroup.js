"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateDropDownFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var DropDownFormGroup_1 = require("./DropDownFormGroup");
var DateDropDownFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(DateDropDownFormGroup, _super);
    function DateDropDownFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.constraints = new ConstraintCollection_1.DateConstraintCollection();
        return _this;
    }
    DateDropDownFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return DateDropDownFormGroup;
}(DropDownFormGroup_1.DropDownFormGroup));
exports.DateDropDownFormGroup = DateDropDownFormGroup;
//# sourceMappingURL=DateDropDownFormGroup.js.map