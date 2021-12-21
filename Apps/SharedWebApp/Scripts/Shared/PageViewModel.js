"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageViewModel = void 0;
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("./ComponentTemplate");
var ComponentViewModel_1 = require("./ComponentViewModel");
var AggregateComponentViewModel_1 = require("./Html/AggregateComponentViewModel");
var ModalComponentViewModel_1 = require("./Modal/ModalComponentViewModel");
var template = require("./Page.html");
var PageViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(PageViewModel, _super);
    function PageViewModel() {
        var _this = _super.call(this, new ComponentTemplate_1.ComponentTemplate('page-body', template)) || this;
        _this.content = new AggregateComponentViewModel_1.AggregateComponentViewModel();
        _this.modalError = new ModalComponentViewModel_1.ModalComponentViewModel();
        return _this;
    }
    return PageViewModel;
}(ComponentViewModel_1.ComponentViewModel));
exports.PageViewModel = PageViewModel;
//# sourceMappingURL=PageViewModel.js.map