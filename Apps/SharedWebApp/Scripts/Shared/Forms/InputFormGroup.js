"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFormGroup = void 0;
var tslib_1 = require("tslib");
var DebouncedAction_1 = require("../DebouncedAction");
var Events_1 = require("../Events");
var SimpleFieldFormGroup_1 = require("./SimpleFieldFormGroup");
var InputFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(InputFormGroup, _super);
    function InputFormGroup(prefix, name, view, viewValue) {
        var _this = _super.call(this, prefix, name, view) || this;
        _this.viewValue = viewValue;
        _this._valueChanged = new Events_1.DefaultEvent(_this);
        _this.valueChanged = _this._valueChanged.handler();
        _this.debouncedOnInputValueChanged = new DebouncedAction_1.DebouncedAction(function () {
            if (!_this.view.input.hasFocus()) {
                var currentValue = _this.view.input.getValue();
                var newValue = _this.viewValue.toView();
                if (newValue !== currentValue) {
                    _this.view.input.setValue(newValue);
                }
            }
        }, 700);
        var valueName = _this.getName();
        _this.view.input.setID(valueName);
        _this.view.input.setName(valueName);
        _this.view.input.changed.register(_this.onInputValueChanged.bind(_this));
        return _this;
    }
    InputFormGroup.prototype.onInputValueChanged = function (viewValue) {
        var value = this.viewValue.setValueFromView(viewValue);
        this._valueChanged.invoke(value);
        this.debouncedOnInputValueChanged.execute();
    };
    InputFormGroup.prototype.getValue = function () {
        return this.viewValue.getValue();
    };
    InputFormGroup.prototype.setValue = function (value) {
        this.viewValue.setValue(value);
        var inputValue = this.viewValue.toView();
        this.view.input.setValue(inputValue);
    };
    InputFormGroup.prototype.setMaxLength = function (maxLength) {
        this.view.input.setMaxLength(maxLength);
    };
    InputFormGroup.prototype.protect = function () {
        this.view.input.setType('password');
    };
    InputFormGroup.prototype.setFocus = function () { this.view.input.setFocus(); };
    InputFormGroup.prototype.blur = function () { this.view.input.blur(); };
    return InputFormGroup;
}(SimpleFieldFormGroup_1.SimpleFieldFormGroup));
exports.InputFormGroup = InputFormGroup;
//# sourceMappingURL=InputFormGroup.js.map