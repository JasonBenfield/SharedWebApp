"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanDropDownFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var DropDownFormGroup_1 = require("./DropDownFormGroup");
var BooleanDropDownFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanDropDownFormGroup, _super);
    function BooleanDropDownFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.constraints = new ConstraintCollection_1.ConstraintCollection();
        return _this;
    }
    BooleanDropDownFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    return BooleanDropDownFormGroup;
}(DropDownFormGroup_1.DropDownFormGroup));
exports.BooleanDropDownFormGroup = BooleanDropDownFormGroup;
//# sourceMappingURL=BooleanDropDownFormGroup.js.map