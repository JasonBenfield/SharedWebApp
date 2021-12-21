"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseForm = void 0;
var tslib_1 = require("tslib");
var AppApiError_1 = require("../AppApiError");
var ConsoleLog_1 = require("../ConsoleLog");
var ModalErrorComponent_1 = require("../Error/ModalErrorComponent");
var ErrorModel_1 = require("../ErrorModel");
var ErrorList_1 = require("./ErrorList");
var FormGroupCollection_1 = require("./FormGroupCollection");
var FormSaveResult_1 = require("./FormSaveResult");
var BaseForm = /** @class */ (function () {
    function BaseForm(name, view) {
        this.name = name;
        this.view = view;
        this.formGroups = new FormGroupCollection_1.FormGroupCollection(name);
        this.modalError = new ModalErrorComponent_1.ModalErrorComponent(this.view.modalError);
        this.modalError.errorSelected.register(this.onErrorSelected.bind(this));
    }
    BaseForm.prototype.onErrorSelected = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var field;
            return tslib_1.__generator(this, function (_a) {
                this.modalError.hide();
                field = this.getField(error.Source);
                if (field) {
                    if (field.setFocus) {
                        field.setFocus();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    BaseForm.prototype.forEachFormGroup = function (action) {
        this.formGroups.forEach(action);
    };
    BaseForm.prototype.getName = function () { return this.name; };
    BaseForm.prototype.getField = function (name) {
        if (name) {
            if (this.getName() === name) {
                return this;
            }
            return this.formGroups.getField(name);
        }
        return null;
    };
    BaseForm.prototype.addHiddenTextFormGroup = function (name, view) {
        return this.formGroups.addHiddenTextFormGroup(name, view);
    };
    BaseForm.prototype.addHiddenNumberFormGroup = function (name, view) {
        return this.formGroups.addHiddenNumberFormGroup(name, view);
    };
    BaseForm.prototype.addHiddenDateFormGroup = function (name, view) {
        return this.formGroups.addHiddenDateFormGroup(name, view);
    };
    BaseForm.prototype.addTextInputFormGroup = function (name, view) {
        return this.formGroups.addTextInputFormGroup(name, view);
    };
    BaseForm.prototype.addNumberInputFormGroup = function (name, view) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    };
    BaseForm.prototype.addDateInputFormGroup = function (name, view) {
        return this.formGroups.addDateInputFormGroup(name, view);
    };
    BaseForm.prototype.addTextDropDownFormGroup = function (name, view) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    };
    BaseForm.prototype.addNumberDropDownFormGroup = function (name, view) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    };
    BaseForm.prototype.addDateDropDownFormGroup = function (name, view) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    };
    BaseForm.prototype.addBooleanDropDownFormGroup = function (name, view) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    };
    BaseForm.prototype.addDropDownFormGroup = function (name, view) {
        return this.formGroups.addDropDownFormGroup(name, view);
    };
    BaseForm.prototype.addFormGroup = function (formGroup) {
        return this.formGroups.addFormGroup(formGroup);
    };
    BaseForm.prototype.save = function (action) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var validationResult, errors_1, result, errors, model, ex_1, caption, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationResult = this.validate();
                        if (validationResult.hasErrors()) {
                            errors_1 = validationResult.values();
                            this.modalError.show(errors_1, "Unable to " + action.friendlyName);
                            return [2 /*return*/, new FormSaveResult_1.FormSaveResult(null, errors_1)];
                        }
                        errors = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        model = this.export();
                        return [4 /*yield*/, action.execute(model, { preventDefault: true })];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        caption = '';
                        if (ex_1 instanceof AppApiError_1.AppApiError) {
                            errors.push.apply(errors, ex_1.getErrors());
                            caption = ex_1.getCaption();
                        }
                        else {
                            error = new ErrorModel_1.ErrorModel(ex_1.message, '', '');
                            errors.push(error);
                            new ConsoleLog_1.ConsoleLog().error(ex_1.message);
                        }
                        this.modalError.show(errors, caption);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, new FormSaveResult_1.FormSaveResult(result, errors)];
                }
            });
        });
    };
    BaseForm.prototype.validate = function () {
        var errors = new ErrorList_1.ErrorList();
        this.formGroups.validate(errors);
        return errors;
    };
    BaseForm.prototype.import = function (values) {
        this.formGroups.import(values);
    };
    BaseForm.prototype.export = function () {
        var values = {};
        this.formGroups.export(values);
        return values;
    };
    return BaseForm;
}());
exports.BaseForm = BaseForm;
//# sourceMappingURL=BaseForm.js.map