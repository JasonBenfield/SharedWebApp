"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroupViewCollection = void 0;
var ComplexFieldFormGroupView_1 = require("./ComplexFieldFormGroupView");
var DropDownFormGroupView_1 = require("./DropDownFormGroupView");
var InputFormGroupView_1 = require("./InputFormGroupView");
var FormGroupViewCollection = /** @class */ (function () {
    function FormGroupViewCollection() {
        this.values = [];
    }
    FormGroupViewCollection.prototype.formGroups = function () {
        return this.values;
    };
    FormGroupViewCollection.prototype.addHiddenInputFormGroup = function () {
        var formGroup = this.addInputFormGroup();
        this.hideFormGroup(formGroup);
        return formGroup;
    };
    FormGroupViewCollection.prototype.hideFormGroup = function (formGroup) {
        formGroup.input.setType('hidden');
        formGroup.hide();
    };
    FormGroupViewCollection.prototype.addInputFormGroup = function () {
        return this.addFormGroup(new InputFormGroupView_1.InputFormGroupView());
    };
    FormGroupViewCollection.prototype.addDropDownFormGroup = function () {
        return this.addFormGroup(new DropDownFormGroupView_1.DropDownFormGroupView());
    };
    FormGroupViewCollection.prototype.addFormGroup = function (formGroup) {
        this.values.push(formGroup);
        return formGroup;
    };
    FormGroupViewCollection.prototype.executeLayout = function () {
        this.forEach(function (fg) {
            if (fg instanceof ComplexFieldFormGroupView_1.ComplexFieldFormGroupView) {
                fg.executeLayout();
            }
        });
    };
    FormGroupViewCollection.prototype.forEach = function (action) {
        for (var _i = 0, _a = this.formGroups(); _i < _a.length; _i++) {
            var formGroup = _a[_i];
            action(formGroup);
        }
    };
    return FormGroupViewCollection;
}());
exports.FormGroupViewCollection = FormGroupViewCollection;
//# sourceMappingURL=FormGroupViewCollection.js.map