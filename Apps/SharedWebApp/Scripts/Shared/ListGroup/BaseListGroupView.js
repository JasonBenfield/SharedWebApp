"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListGroupView = void 0;
var tslib_1 = require("tslib");
var BaseListView_1 = require("./BaseListView");
var BaseListGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(BaseListGroupView, _super);
    function BaseListGroupView(createItemView, vm) {
        var _this = _super.call(this, createItemView, vm) || this;
        _this.addCssName('list-group');
        return _this;
    }
    BaseListGroupView.prototype.makeFlush = function () {
        this.addCssName('list-group-flush');
    };
    return BaseListGroupView;
}(BaseListView_1.BaseListView));
exports.BaseListGroupView = BaseListGroupView;
//# sourceMappingURL=BaseListGroupView.js.map