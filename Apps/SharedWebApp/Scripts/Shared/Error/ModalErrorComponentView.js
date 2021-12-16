"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorComponentView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var ButtonCommandItem_1 = require("../Command/ButtonCommandItem");
var ContextualClass_1 = require("../ContextualClass");
var Events_1 = require("../Events");
var Row_1 = require("../Grid/Row");
var HorizontalRule_1 = require("../Html/HorizontalRule");
var HtmlComponent_1 = require("../Html/HtmlComponent");
var TextHeading5_1 = require("../Html/TextHeading5");
var ModalComponentView_1 = require("../Modal/ModalComponentView");
var ModalComponentViewModel_1 = require("../Modal/ModalComponentViewModel");
var TextCss_1 = require("../TextCss");
var ModalErrorGroupComponentView_1 = require("./ModalErrorGroupComponentView");
var ModalErrorComponentView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalErrorComponentView, _super);
    function ModalErrorComponentView(vm) {
        if (vm === void 0) { vm = new ModalComponentViewModel_1.ModalComponentViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this._errorSelected = new Events_1.DefaultEvent(_this);
        _this.errorSelected = _this._errorSelected.handler();
        _this.errorGroups = [];
        _this.modal = new ModalComponentView_1.ModalComponentView(vm);
        _this.modal.body.setName(ModalErrorComponentView.name);
        _this.title = _this.modal.header.addContent(new TextHeading5_1.TextHeading5(''));
        _this.hr = _this.modal.body.addContent(new HorizontalRule_1.HorizontalRule());
        var row = _this.modal.footer.addContent(new Row_1.Row());
        row.addColumn();
        var buttonColumn = row.addColumn();
        buttonColumn.setTextCss(new TextCss_1.TextCss().end());
        buttonColumn.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
        _this.okButton = _this.modal.footer.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        _this.okButton.setText('OK');
        _this.okButton.setContext(ContextualClass_1.ContextualClass.danger);
        _this.closed = _this.modal.closed;
        return _this;
    }
    ModalErrorComponentView.prototype.errorGroup = function () {
        var errorGroup = new ModalErrorGroupComponentView_1.ModalErrorGroupComponentView();
        this.errorGroups.push(errorGroup);
        this.modal.body.addContent(errorGroup);
        return errorGroup;
    };
    ModalErrorComponentView.prototype.clearErrorGroups = function () {
        for (var _i = 0, _a = this.errorGroups; _i < _a.length; _i++) {
            var errorGroup = _a[_i];
            this.modal.body.removeItem(errorGroup);
        }
    };
    ModalErrorComponentView.prototype.setTitle = function (title) {
        this.title.setText(title);
    };
    ModalErrorComponentView.prototype.showModal = function () {
        this.modal.showModal();
    };
    ModalErrorComponentView.prototype.hideModal = function () {
        this.modal.hideModal();
    };
    return ModalErrorComponentView;
}(HtmlComponent_1.HtmlComponent));
exports.ModalErrorComponentView = ModalErrorComponentView;
//# sourceMappingURL=ModalErrorComponentView.js.map