"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalRuleViewModel = void 0;
var tslib_1 = require("tslib");
var ko = require("knockout");
var ComponentTemplate_1 = require("../ComponentTemplate");
var ComponentViewModel_1 = require("../ComponentViewModel");
var template = require("./HorizontalRule.html");
var HorizontalRuleViewModel = /** @class */ (function (_super) {
    tslib_1.__extends(HorizontalRuleViewModel, _super);
    function HorizontalRuleViewModel() {
        var _this = _super.call(this, new ComponentTemplate_1.ComponentTemplate('hr', template)) || this;
        _this.isVisible = ko.observable(true);
        return _this;
    }
    return HorizontalRuleViewModel;
}(ComponentViewModel_1.ComponentViewModel));
exports.HorizontalRuleViewModel = HorizontalRuleViewModel;
//# sourceMappingURL=HorizontalRuleViewModel.js.map