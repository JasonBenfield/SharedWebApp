"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormView = void 0;
var tslib_1 = require("tslib");
var ButtonCommandItem_1 = require("../Command/ButtonCommandItem");
var AggregateComponent_1 = require("./AggregateComponent");
var FormViewModel_1 = require("./FormViewModel");
var HtmlContainerComponent_1 = require("./HtmlContainerComponent");
var FormView = /** @class */ (function (_super) {
    tslib_1.__extends(FormView, _super);
    function FormView(vm) {
        if (vm === void 0) { vm = new FormViewModel_1.FormViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.submitted = _this.vm.submitted;
        _this.content = new AggregateComponent_1.AggregateComponent(_this.vm.content);
        _this.setAction("#");
        return _this;
    }
    FormView.prototype.useDefaultSubmit = function () {
        this.vm.useDefaultSubmit();
    };
    FormView.prototype.clearAutocomplete = function () { this.setAutocomplete(null); };
    FormView.prototype.setAutocompleteOff = function () { this.setAutocomplete('off'); };
    FormView.prototype.setAutocompleteNewPassword = function () { this.setAutocomplete('new-password'); };
    FormView.prototype.setAutocomplete = function (autocomplete) {
        this.vm.autocomplete(autocomplete);
    };
    FormView.prototype.setAction = function (action) { this.vm.action(action); };
    FormView.prototype.setMethod = function (method) { this.vm.method(method); };
    FormView.prototype.addOffscreenSubmit = function () {
        return this.addContent(new ButtonCommandItem_1.ButtonCommandItem())
            .configure(function (button) {
            button.makeOffscreenSubmit();
        });
    };
    return FormView;
}(HtmlContainerComponent_1.HtmlContainerComponent));
exports.FormView = FormView;
//# sourceMappingURL=FormView.js.map