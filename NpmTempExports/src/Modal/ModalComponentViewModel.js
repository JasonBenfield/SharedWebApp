"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalComponentViewModel = void 0;
var tslib_1 = require("tslib");
var ko = require("knockout");
var template = require("./ModalComponent.html");
var ComponentTemplate_1 = require("../ComponentTemplate");
var ModalOptionsViewModel_1 = require("./ModalOptionsViewModel");
var AggregateComponentViewModel_1 = require("../Html/AggregateComponentViewModel");
var HtmlComponentViewModel_1 = require("../Html/HtmlComponentViewModel");
var ModalComponentViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(ModalComponentViewModel, _super);
    function ModalComponentViewModel() {
        var _this = _super.call(this, new ComponentTemplate_1.ComponentTemplate('modal-component', template)) || this;
        _this.content = new AggregateComponentViewModel_1.AggregateComponentViewModel();
        _this.title = ko.observable('');
        _this.isVisible = ko.observable(false);
        _this.modalOptions = new ModalOptionsViewModel_1.ModalOptionsViewModel();
        return _this;
    }
    return ModalComponentViewModel;
}(HtmlComponentViewModel_1.HtmlComponentViewModel));
exports.ModalComponentViewModel = ModalComponentViewModel;
//# sourceMappingURL=ModalComponentViewModel.js.map