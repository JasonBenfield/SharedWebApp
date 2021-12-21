"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroupCollection = void 0;
var BooleanDropDownFormGroup_1 = require("./BooleanDropDownFormGroup");
var DateDropDownFormGroup_1 = require("./DateDropDownFormGroup");
var DateInputFormGroup_1 = require("./DateInputFormGroup");
var DropDownFormGroup_1 = require("./DropDownFormGroup");
var NumberDropDownFormGroup_1 = require("./NumberDropDownFormGroup");
var NumberInputFormGroup_1 = require("./NumberInputFormGroup");
var TextDropDownFormGroup_1 = require("./TextDropDownFormGroup");
var TextInputFormGroup_1 = require("./TextInputFormGroup");
var FormGroupCollection = /** @class */ (function () {
    function FormGroupCollection(name) {
        this.name = name;
        this.values = [];
    }
    FormGroupCollection.prototype.formGroups = function () {
        return this.values;
    };
    FormGroupCollection.prototype.addHiddenTextFormGroup = function (name, view) {
        return this.addFormGroup(new TextInputFormGroup_1.TextInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addHiddenNumberFormGroup = function (name, view) {
        return this.addFormGroup(new NumberInputFormGroup_1.NumberInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addHiddenDateFormGroup = function (name, view) {
        return this.addFormGroup(new DateInputFormGroup_1.DateInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addTextInputFormGroup = function (name, view) {
        return this.addFormGroup(new TextInputFormGroup_1.TextInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addNumberInputFormGroup = function (name, view) {
        return this.addFormGroup(new NumberInputFormGroup_1.NumberInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addDateInputFormGroup = function (name, view) {
        return this.addFormGroup(new DateInputFormGroup_1.DateInputFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addTextDropDownFormGroup = function (name, view) {
        return this.addFormGroup(new TextDropDownFormGroup_1.TextDropDownFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addNumberDropDownFormGroup = function (name, view) {
        return this.addFormGroup(new NumberDropDownFormGroup_1.NumberDropDownFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addDateDropDownFormGroup = function (name, view) {
        return this.addFormGroup(new DateDropDownFormGroup_1.DateDropDownFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addBooleanDropDownFormGroup = function (name, view) {
        return this.addFormGroup(new BooleanDropDownFormGroup_1.BooleanDropDownFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addDropDownFormGroup = function (name, view) {
        return this.addFormGroup(new DropDownFormGroup_1.DropDownFormGroup(this.name, name, view));
    };
    FormGroupCollection.prototype.addFormGroup = function (formGroup) {
        this.values.push(formGroup);
        return formGroup;
    };
    FormGroupCollection.prototype.forEach = function (action) {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var formGroup = _a[_i];
            action(formGroup);
        }
    };
    FormGroupCollection.prototype.getField = function (name) {
        var match = null;
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var formGroup = _a[_i];
            var testField = formGroup.getField(name);
            if (testField) {
                match = testField;
                break;
            }
        }
        return match;
    };
    FormGroupCollection.prototype.clearErrors = function () {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var field = _a[_i];
            field.clearErrors();
        }
    };
    FormGroupCollection.prototype.validate = function (errors) {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var field = _a[_i];
            field.validate(errors);
        }
    };
    FormGroupCollection.prototype.import = function (values) {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var field = _a[_i];
            field.import(values);
        }
    };
    FormGroupCollection.prototype.export = function (values) {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var field = _a[_i];
            field.export(values);
        }
    };
    return FormGroupCollection;
}());
exports.FormGroupCollection = FormGroupCollection;
//# sourceMappingURL=FormGroupCollection.js.map