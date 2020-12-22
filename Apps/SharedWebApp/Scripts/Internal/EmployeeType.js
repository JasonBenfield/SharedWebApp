"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeType = exports.EmployeeTypes = void 0;
var tslib_1 = require("tslib");
var NumericValue_1 = require("../Shared/NumericValue");
var NumericValues_1 = require("../Shared/NumericValues");
var EmployeeTypes = /** @class */ (function (_super) {
    tslib_1.__extends(EmployeeTypes, _super);
    function EmployeeTypes(none, temp, permanent) {
        var _this = _super.call(this, [none, temp, permanent]) || this;
        _this.none = none;
        _this.temp = temp;
        _this.permanent = permanent;
        return _this;
    }
    return EmployeeTypes;
}(NumericValues_1.NumericValues));
exports.EmployeeTypes = EmployeeTypes;
var EmployeeType = /** @class */ (function (_super) {
    tslib_1.__extends(EmployeeType, _super);
    function EmployeeType(Value, DisplayText) {
        return _super.call(this, Value, DisplayText) || this;
    }
    EmployeeType.values = new EmployeeTypes(new EmployeeType(0, 'None'), new EmployeeType(1, 'Temp'), new EmployeeType(2, 'Permanent'));
    return EmployeeType;
}(NumericValue_1.NumericValue));
exports.EmployeeType = EmployeeType;
//# sourceMappingURL=EmployeeType.js.map