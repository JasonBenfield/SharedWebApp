"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFormView = void 0;
var tslib_1 = require("tslib");
var ModalErrorComponentView_1 = require("../Error/ModalErrorComponentView");
var FormComponent_1 = require("../Html/FormComponent");
var FormComponentViewModel_1 = require("../Html/FormComponentViewModel");
var ComplexFieldLayout_1 = require("./ComplexFieldLayout");
var FormGroupViewCollection_1 = require("./FormGroupViewCollection");
var BaseFormView = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BaseFormView, _super);
    function BaseFormView(vm) {
        if (vm === void 0) { vm = new FormComponentViewModel_1.FormComponentViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.layout = new ComplexFieldLayout_1.ComplexFieldLayout(_this);
        _this.formGroups = new FormGroupViewCollection_1.FormGroupViewCollection();
        _this.modalError = _this.addContent(new ModalErrorComponentView_1.ModalErrorComponentView());
        return _this;
    }
    BaseFormView.prototype.useLayout = function (layout) {
        this.layout = layout;
    };
    BaseFormView.prototype.executeLayout = function () {
        this.layout.execute();
        this.formGroups.executeLayout();
    };
    BaseFormView.prototype.forEachFormGroup = function (action) {
        this.formGroups.forEach(action);
    };
    BaseFormView.prototype.addHiddenFormGroup = function () {
        return this.formGroups.addHiddenInputFormGroup();
    };
    BaseFormView.prototype.addInputFormGroup = function () {
        return this.formGroups.addInputFormGroup();
    };
    BaseFormView.prototype.addDropDownFormGroup = function () {
        return this.formGroups.addDropDownFormGroup();
    };
    BaseFormView.prototype.addFormGroup = function (formGroup) {
        return this.formGroups.addFormGroup(formGroup);
    };
    return BaseFormView;
}(FormComponent_1.FormComponent));
exports.BaseFormView = BaseFormView;
//# sourceMappingURL=BaseFormView.js.map