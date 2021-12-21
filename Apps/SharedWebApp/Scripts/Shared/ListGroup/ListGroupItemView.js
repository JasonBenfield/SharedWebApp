"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGroupItemView = void 0;
var tslib_1 = require("tslib");
var ContextualClass_1 = require("../ContextualClass");
var AggregateComponent_1 = require("../Html/AggregateComponent");
var HtmlComponent_1 = require("../Html/HtmlComponent");
var ListItemViewModel_1 = require("../Html/ListItemViewModel");
var ListGroupItemView = /** @class */ (function (_super) {
    tslib_1.__extends(ListGroupItemView, _super);
    function ListGroupItemView(vm) {
        if (vm === void 0) { vm = new ListItemViewModel_1.ListItemViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.content = new AggregateComponent_1.AggregateComponent(_this.vm.content);
        _this.contextClass = ContextualClass_1.ContextualClass.default;
        _this.active = '';
        _this.addCssName('list-group-item');
        if (vm.isClickable) {
            _this.addCssName('list-group-item-action');
        }
        return _this;
    }
    ListGroupItemView.prototype.getData = function () { return this.data; };
    ListGroupItemView.prototype.setData = function (data) { this.data = data; };
    ListGroupItemView.prototype.addToList = function (list) {
        list.addFromListItem(this.vm, this);
        return this;
    };
    ListGroupItemView.prototype.removeFromList = function (list) {
        list.removeFromListItem(this.vm, this);
        return this;
    };
    ListGroupItemView.prototype.addContent = function (item) {
        return item.addToContainer(this.content);
    };
    ListGroupItemView.prototype.setContext = function (contextClass) {
        var newCss = this.getCss(contextClass);
        this.replaceCssName(this.getCss(this.contextClass), newCss);
        this.contextClass = contextClass;
    };
    ListGroupItemView.prototype.getCss = function (contextClass) {
        return contextClass && !contextClass.equals(ContextualClass_1.ContextualClass.default) ?
            contextClass.toString() : '';
    };
    ListGroupItemView.prototype.activate = function () {
        this.setActive('active');
    };
    ListGroupItemView.prototype.deactivate = function () {
        this.setActive('');
    };
    ListGroupItemView.prototype.setActive = function (active) {
        if (this.active) {
            this.removeCssName(this.active);
        }
        this.active = active;
        this.addCssName(this.active);
    };
    return ListGroupItemView;
}(HtmlComponent_1.HtmlComponent));
exports.ListGroupItemView = ListGroupItemView;
//# sourceMappingURL=ListGroupItemView.js.map