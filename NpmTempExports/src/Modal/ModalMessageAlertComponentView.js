"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalMessageAlertComponentView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var ButtonCommandItem_1 = require("../Command/ButtonCommandItem");
var ContextualClass_1 = require("../ContextualClass");
var Row_1 = require("../Grid/Row");
var HtmlComponent_1 = require("../Html/HtmlComponent");
var MarginCss_1 = require("../MarginCss");
var MessageAlertView_1 = require("../MessageAlertView");
var TextCss_1 = require("../TextCss");
var ModalComponentView_1 = require("./ModalComponentView");
var ModalComponentViewModel_1 = require("./ModalComponentViewModel");
var ModalMessageAlertComponentView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalMessageAlertComponentView, _super);
    function ModalMessageAlertComponentView(vm) {
        if (vm === void 0) { vm = new ModalComponentViewModel_1.ModalComponentViewModel(); }
        var _this = _super.call(this, vm) || this;
        _this.modal = new ModalComponentView_1.ModalComponentView(vm);
        _this.modal.header.hide();
        _this.modal.body.setName(ModalMessageAlertComponentView.name);
        _this.alert = _this.modal.body.addContent(new MessageAlertView_1.MessageAlertView());
        _this.alert.setMargin(MarginCss_1.MarginCss.xs(0));
        var row = _this.modal.footer.addContent(new Row_1.Row());
        row.addColumn();
        var buttonColumn = row.addColumn()
            .configure(function (c) {
            c.setTextCss(new TextCss_1.TextCss().end());
            c.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
        });
        _this.okButton = buttonColumn.addContent(new ButtonCommandItem_1.ButtonCommandItem());
        _this.okButton.icon.setName('check');
        _this.okButton.setText('OK');
        _this.okButton.setContext(ContextualClass_1.ContextualClass.secondary);
        _this.okButton.setMargin(MarginCss_1.MarginCss.end(1));
        _this.closed = _this.modal.closed;
        return _this;
    }
    ModalMessageAlertComponentView.prototype.setBackdrop = function (backdrop) {
        this.modal.setBackdrop(backdrop);
    };
    ModalMessageAlertComponentView.prototype.showModal = function () { this.modal.showModal(); };
    ModalMessageAlertComponentView.prototype.hideModal = function () { this.modal.hideModal(); };
    return ModalMessageAlertComponentView;
}(HtmlComponent_1.HtmlComponent));
exports.ModalMessageAlertComponentView = ModalMessageAlertComponentView;
//# sourceMappingURL=ModalMessageAlertComponentView.js.map