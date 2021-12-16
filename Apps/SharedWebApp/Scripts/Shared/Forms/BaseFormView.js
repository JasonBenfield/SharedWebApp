"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFormView = void 0;
var tslib_1 = require("tslib");
var ModalErrorComponentView_1 = require("../Error/ModalErrorComponentView");
var FormView_1 = require("../Html/FormView");
var FormViewModel_1 = require("../Html/FormViewModel");
var ComplexFieldLayout_1 = require("./ComplexFieldLayout");
var FormGroupViewCollection_1 = require("./FormGroupViewCollection");
var BaseFormView = /** @class */ (function (_super) {
    tslib_1.__extends(BaseFormView, _super);
    function BaseFormView(vm) {
        if (vm === void 0) { vm = new FormViewModel_1.FormViewModel(); }
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
}(FormView_1.FormView));
exports.BaseFormView = BaseFormView;
//# sourceMappingURL=BaseFormView.js.map