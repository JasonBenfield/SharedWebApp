"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalConfirmComponentView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var ButtonCommandItem_1 = require("../Command/ButtonCommandItem");
var ContextualClass_1 = require("../ContextualClass");
var Row_1 = require("../Grid/Row");
var HtmlComponent_1 = require("../Html/HtmlComponent");
var TextBlock_1 = require("../Html/TextBlock");
var TextHeading5_1 = require("../Html/TextHeading5");
var MarginCss_1 = require("../MarginCss");
var TextCss_1 = require("../TextCss");
var ModalComponentView_1 = require("./ModalComponentView");
var ModalComponentViewModel_1 = require("./ModalComponentViewModel");
var ModalConfirmComponentView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalConfirmComponentView, _super);
    function ModalConfirmComponentView(vm) {
        if (vm === void 0) { vm = new ModalComponentViewModel_1.ModalComponentViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.modal = new ModalComponentView_1.ModalComponentView(vm);
        _this.modal.setBackdrop('static');
        _this.modal.body.setName(ModalConfirmComponentView.name);
        _this.title = _this.modal.header.addContent(new TextHeading5_1.TextHeading5(''));
        _this.message = _this.modal.body.addContent(new TextBlock_1.TextBlock(''));
        var row = _this.modal.footer.addContent(new Row_1.Row());
        row.addColumn();
        var buttonColumn = row.addColumn()
            .configure(function (c) {
            c.setTextCss(new TextCss_1.TextCss().end());
            c.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
        });
        _this.noButton = buttonColumn.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        _this.noButton.icon.setName('times');
        _this.noButton.setText('No');
        _this.noButton.setContext(ContextualClass_1.ContextualClass.secondary);
        _this.noButton.setMargin(MarginCss_1.MarginCss.end(1));
        _this.yesButton == buttonColumn.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        _this.yesButton.icon.setName('check');
        _this.yesButton.setText('Yes');
        _this.yesButton.setContext(ContextualClass_1.ContextualClass.primary);
        _this.closed = _this.modal.closed;
        return _this;
    }
    ModalConfirmComponentView.prototype.setTitle = function (title) {
        this.title.setText(title);
    };
    ModalConfirmComponentView.prototype.showTitle = function () { this.title.show(); };
    ModalConfirmComponentView.prototype.hideTitle = function () { this.title.hide(); };
    ModalConfirmComponentView.prototype.setMessage = function (message) {
        this.message.setText(message);
    };
    ModalConfirmComponentView.prototype.showModal = function () {
        this.modal.showModal();
    };
    ModalConfirmComponentView.prototype.hideModal = function () {
        this.modal.hideModal();
    };
    return ModalConfirmComponentView;
}(HtmlComponent_1.HtmlComponent));
exports.ModalConfirmComponentView = ModalConfirmComponentView;
//# sourceMappingURL=ModalConfirmComponentView.js.map