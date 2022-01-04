"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavViewModel = void 0;
var tslib_1 = require("tslib");
var HtmlComponentViewModel_1 = require("./HtmlComponentViewModel");
var template = require("./Nav.html");
var ComponentTemplate_1 = require("../ComponentTemplate");
var AggregateComponentViewModel_1 = require("./AggregateComponentViewModel");
var ko = require("knockout");
var NavViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(NavViewModel, _super);
    function NavViewModel() {
        var _this = _super.call(this, new ComponentTemplate_1.ComponentTemplate('nav', template)) || this;
        _this.content = new AggregateComponentViewModel_1.AggregateComponentViewModel();
        _this.role = ko.observable(null);
        return _this;
    }
    return NavViewModel;
}(HtmlComponentViewModel_1.HtmlComponentViewModel));
exports.NavViewModel = NavViewModel;
//# sourceMappingURL=NavViewModel.js.map