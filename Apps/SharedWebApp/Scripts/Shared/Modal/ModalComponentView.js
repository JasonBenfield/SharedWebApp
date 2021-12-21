"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalComponentView = void 0;
var tslib_1 = require("tslib");
var Block_1 = require("../Html/Block");
var HtmlContainerComponent_1 = require("../Html/HtmlContainerComponent");
var ModalComponentViewModel_1 = require("./ModalComponentViewModel");
var ModalComponentView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalComponentView, _super);
    function ModalComponentView(vm) {
        if (vm === void 0) { vm = new ModalComponentViewModel_1.ModalComponentViewModel(); }
        var _this = _super.call(this, vm) || this;
        var dialog = _this.addContent(new Block_1.Block());
        dialog.setRole('document');
        dialog.addCssName('modal-dialog');
        dialog.addCssName('modal-dialog-centered');
        var content = dialog.addContent(new Block_1.Block());
        content.addCssName('modal-content');
        _this.header = content.addContent(new Block_1.Block());
        _this.header.addCssName('modal-header');
        _this.body = content.addContent(new Block_1.Block());
        _this.body.addCssName('modal-body');
        _this.footer = content.addContent(new Block_1.Block());
        _this.footer.addCssName('modal-footer');
        _this.closed = _this.vm.modalOptions.closed;
        return _this;
    }
    ModalComponentView.prototype.addToContainer = function (container) {
        return container.addItem(this.vm, this);
    };
    ModalComponentView.prototype.insertIntoContainer = function (container, index) {
        return container.insertItem(index, this.vm, this);
    };
    ModalComponentView.prototype.removeFromContainer = function (container) {
        return container.removeItem(this);
    };
    ModalComponentView.prototype.setBackdrop = function (backdrop) {
        this.vm.modalOptions.backrop(backdrop);
    };
    ModalComponentView.prototype.showModal = function () {
        this.vm.modalOptions.command('show');
    };
    ModalComponentView.prototype.hideModal = function () {
        this.vm.modalOptions.command('hide');
    };
    return ModalComponentView;
}(HtmlContainerComponent_1.HtmlContainerComponent));
exports.ModalComponentView = ModalComponentView;
//# sourceMappingURL=ModalComponentView.js.map