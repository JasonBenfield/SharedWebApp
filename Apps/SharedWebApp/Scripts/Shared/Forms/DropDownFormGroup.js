"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownFormGroup = void 0;
var tslib_1 = require("tslib");
var ConstraintCollection_1 = require("./ConstraintCollection");
var SimpleFieldFormGroup_1 = require("./SimpleFieldFormGroup");
var DropDownFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownFormGroup, _super);
    function DropDownFormGroup(prefix, name, view) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.constraints = new ConstraintCollection_1.ConstraintCollection();
        _this.valueChanged = _this.view.select.changed;
        return _this;
    }
    DropDownFormGroup.prototype.validateConstraints = function (fieldErrors) {
        this.constraints.validate(fieldErrors, this);
    };
    DropDownFormGroup.prototype.getValue = function () {
        return this.view.select.getValue();
    };
    DropDownFormGroup.prototype.setValue = function (value) {
        this.view.select.setValue(value);
    };
    DropDownFormGroup.prototype.setItems = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.view.select.setItems(items);
    };
    DropDownFormGroup.prototype.setItemCaption = function (itemCaption) {
        this.view.select.setItemCaption(itemCaption);
    };
    return DropDownFormGroup;
}(SimpleFieldFormGroup_1.SimpleFieldFormGroup));
exports.DropDownFormGroup = DropDownFormGroup;
//# sourceMappingURL=DropDownFormGroup.js.map