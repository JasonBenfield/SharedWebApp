"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexFieldFormGroup = void 0;
var tslib_1 = require("tslib");
var FormGroup_1 = require("../Html/FormGroup");
var FormGroupCollection_1 = require("./FormGroupCollection");
var ComplexFieldFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ComplexFieldFormGroup, _super);
    function ComplexFieldFormGroup(prefix, name, view) {
        var _this = _super.call(this, view) || this;
        _this.view = view;
        _this.name = prefix ? prefix + "_" + name : name;
        _this.formGroups = new FormGroupCollection_1.FormGroupCollection(_this.name);
        return _this;
    }
    ComplexFieldFormGroup.prototype.getName = function () { return this.name; };
    ComplexFieldFormGroup.prototype.setValue = function (_) { };
    ComplexFieldFormGroup.prototype.getValue = function () { return {}; };
    ComplexFieldFormGroup.prototype.getField = function (name) {
        if (this.getName() === name) {
            return this;
        }
        return this.formGroups.getField(name);
    };
    ComplexFieldFormGroup.prototype.forEachFormGroup = function (action) {
        this.formGroups.forEach(action);
    };
    ComplexFieldFormGroup.prototype.addHiddenTextFormGroup = function (name, view) {
        return this.formGroups.addHiddenTextFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addHiddenNumberFormGroup = function (name, view) {
        return this.formGroups.addHiddenNumberFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addHiddenDateFormGroup = function (name, view) {
        return this.formGroups.addHiddenDateFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addTextInputFormGroup = function (name, view) {
        return this.formGroups.addTextInputFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addNumberInputFormGroup = function (name, view) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addDateInputFormGroup = function (name, view) {
        return this.formGroups.addDateInputFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addTextDropDownFormGroup = function (name, view) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addNumberDropDownFormGroup = function (name, view) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addDateDropDownFormGroup = function (name, view) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addBooleanDropDownFormGroup = function (name, view) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addDropDownFormGroup = function (name, view) {
        return this.formGroups.addDropDownFormGroup(name, view);
    };
    ComplexFieldFormGroup.prototype.addFormGroup = function (name, formGroup) {
        return this.formGroups.addFormGroup(formGroup);
    };
    ComplexFieldFormGroup.prototype.clearErrors = function () {
        this.formGroups.clearErrors();
    };
    ComplexFieldFormGroup.prototype.validate = function (errors) {
        this.formGroups.validate(errors);
    };
    ComplexFieldFormGroup.prototype.import = function (values) {
        if (values) {
            this.formGroups.import(values);
        }
    };
    ComplexFieldFormGroup.prototype.export = function (values) {
        this.formGroups.export(values);
    };
    return ComplexFieldFormGroup;
}(FormGroup_1.FormGroup));
exports.ComplexFieldFormGroup = ComplexFieldFormGroup;
//# sourceMappingURL=ComplexFieldFormGroup.js.map