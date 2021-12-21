"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFieldFormGroupView = void 0;
var tslib_1 = require("tslib");
var Alert_1 = require("../Alert");
var ContextualClass_1 = require("../ContextualClass");
var DropdownComponent_1 = require("../Dropdown/DropdownComponent");
var FaIcon_1 = require("../FaIcon");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var FormGroupView_1 = require("../Html/FormGroupView");
var ListItem_1 = require("../Html/ListItem");
var ListGroupView_1 = require("../ListGroup/ListGroupView");
var MarginCss_1 = require("../MarginCss");
var PaddingCss_1 = require("../PaddingCss");
var ErrorListItemView_1 = require("./ErrorListItemView");
var SimpleFieldFormGroupView = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleFieldFormGroupView, _super);
    function SimpleFieldFormGroupView(vm) {
        if (vm === void 0) { vm = new BlockViewModel_1.BlockViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.dropdown = _this.inputGroup.addContent(new DropdownComponent_1.DropdownComponent());
        _this.dropdown.hide();
        _this.dropdown.button.setContext(ContextualClass_1.ContextualClass.danger);
        _this.dropdown.button.useOutlineStyle();
        _this.dropdown.button.addContent(new FaIcon_1.FaIcon('exclamation'))
            .configure(function (i) {
            i.solidStyle();
        });
        _this.dropdown.menu.setPadding(PaddingCss_1.PaddingCss.xs(0));
        var alertItem = new ListItem_1.ListItem().addToList(_this.dropdown.menu);
        alertItem.addCssName(ContextualClass_1.ContextualClass.danger.append('border'));
        var alert = alertItem.addContent(new Alert_1.Alert());
        alert.setMargin(MarginCss_1.MarginCss.xs(0));
        alert.setContext(ContextualClass_1.ContextualClass.danger);
        _this.alertList = alert.addContent(new ListGroupView_1.ListGroupView(function () { return new ErrorListItemView_1.ErrorListItemView(); }));
        return _this;
    }
    SimpleFieldFormGroupView.prototype.showDropDown = function () { this.dropdown.show(); };
    SimpleFieldFormGroupView.prototype.hideDropDown = function () { this.dropdown.hide(); };
    return SimpleFieldFormGroupView;
}(FormGroupView_1.FormGroupView));
exports.SimpleFieldFormGroupView = SimpleFieldFormGroupView;
//# sourceMappingURL=SimpleFieldFormGroupView.js.map