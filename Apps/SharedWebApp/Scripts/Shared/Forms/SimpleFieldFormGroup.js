"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFieldFormGroup = void 0;
var ListGroup_1 = require("../ListGroup/ListGroup");
var ErrorList_1 = require("./ErrorList");
var ErrorListItem_1 = require("./ErrorListItem");
var SimpleFieldFormGroup = /** @class */ (function () {
    function SimpleFieldFormGroup(prefix, name, view) {
        this.view = view;
        this.name = prefix ? prefix + "_" + name : name;
        this.alertList = new ListGroup_1.ListGroup(this.view.alertList);
    }
    SimpleFieldFormGroup.prototype.getName = function () {
        return this.name;
    };
    SimpleFieldFormGroup.prototype.getCaption = function () {
        return this.caption;
    };
    SimpleFieldFormGroup.prototype.setCaption = function (caption) {
        this.view.setCaption(caption);
    };
    SimpleFieldFormGroup.prototype.getField = function (name) { return this.getName() === name ? this : null; };
    SimpleFieldFormGroup.prototype.setErrors = function (errors) {
        this.alertList.setItems(errors, function (e, li) { return new ErrorListItem_1.ErrorListItem(e, li); });
        if (errors.length > 0) {
            this.view.showDropDown();
        }
        else {
            this.view.hideDropDown();
        }
    };
    SimpleFieldFormGroup.prototype.clearErrors = function () {
        this.setErrors([]);
    };
    SimpleFieldFormGroup.prototype.validate = function (errors) {
        var fieldErrors = new ErrorList_1.ErrorList();
        this.validateConstraints(fieldErrors);
        this.setErrors(fieldErrors.values());
        errors.merge(fieldErrors);
    };
    SimpleFieldFormGroup.prototype.import = function (values) {
        if (values) {
            var value = values[this.getName()];
            if (value !== undefined) {
                this.setValue(value);
            }
        }
    };
    SimpleFieldFormGroup.prototype.export = function (values) {
        values[this.getName()] = this.getValue();
    };
    return SimpleFieldFormGroup;
}());
exports.SimpleFieldFormGroup = SimpleFieldFormGroup;
//# sourceMappingURL=SimpleFieldFormGroup.js.map