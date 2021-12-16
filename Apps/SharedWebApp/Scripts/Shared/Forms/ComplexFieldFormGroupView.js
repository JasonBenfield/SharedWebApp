"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexFieldFormGroupView = void 0;
var tslib_1 = require("tslib");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var FormGroupView_1 = require("../Html/FormGroupView");
var ComplexFieldLayout_1 = require("./ComplexFieldLayout");
var FormGroupViewCollection_1 = require("./FormGroupViewCollection");
var ComplexFieldFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(ComplexFieldFormGroupView, _super);
    function ComplexFieldFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.layout = new ComplexFieldLayout_1.ComplexFieldLayout(_this);
        _this.formGroups = new FormGroupViewCollection_1.FormGroupViewCollection();
        return _this;
    }
    ComplexFieldFormGroupView.prototype.useLayout = function (createLayout) {
        this.layout = createLayout(this);
    };
    ComplexFieldFormGroupView.prototype.executeLayout = function () {
        this.layout.execute();
        this.formGroups.executeLayout();
    };
    ComplexFieldFormGroupView.prototype.forEachFormGroup = function (action) {
        this.formGroups.forEach(action);
    };
    ComplexFieldFormGroupView.prototype.addHiddenFormGroup = function () {
        return this.formGroups.addHiddenInputFormGroup();
    };
    ComplexFieldFormGroupView.prototype.addInputFormGroup = function () {
        return this.formGroups.addInputFormGroup();
    };
    ComplexFieldFormGroupView.prototype.addDropDownFormGroup = function () {
        return this.formGroups.addDropDownFormGroup();
    };
    ComplexFieldFormGroupView.prototype.addFormGroup = function (formGroup) {
        return this.formGroups.addFormGroup(formGroup);
    };
    return ComplexFieldFormGroupView;
}(FormGroupView_1.FormGroupView));
exports.ComplexFieldFormGroupView = ComplexFieldFormGroupView;
//# sourceMappingURL=ComplexFieldFormGroupView.js.map