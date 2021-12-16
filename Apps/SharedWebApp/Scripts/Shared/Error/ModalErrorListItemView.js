"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorListItemView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var Row_1 = require("../Grid/Row");
var TextBlock_1 = require("../Html/TextBlock");
var LinkListGroupItemView_1 = require("../ListGroup/LinkListGroupItemView");
var LinkListItemViewModel_1 = require("../ListGroup/LinkListItemViewModel");
var ModalErrorListItemView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalErrorListItemView, _super);
    function ModalErrorListItemView() {
        var _this = _super.call(this, new LinkListItemViewModel_1.LinkListItemViewModel()) || this;
        var row = _this.addContent(new Row_1.Row());
        var col1 = row.addColumn();
        col1.setColumnCss(ColumnCss_1.ColumnCss.xs(3));
        _this.caption = col1.addContent(new TextBlock_1.TextBlock());
        var col2 = row.addColumn();
        _this.message = col2.addContent(new TextBlock_1.TextBlock());
        return _this;
    }
    ModalErrorListItemView.prototype.hideCaption = function () { this.caption.hide(); };
    ModalErrorListItemView.prototype.showCaption = function () { this.caption.show(); };
    ModalErrorListItemView.prototype.setCaption = function (caption) { this.caption.setText(caption); };
    ModalErrorListItemView.prototype.setMessage = function (message) { this.message.setText(message); };
    return ModalErrorListItemView;
}(LinkListGroupItemView_1.LinkListGroupItem));
exports.ModalErrorListItemView = ModalErrorListItemView;
//# sourceMappingURL=ModalErrorListItemView.js.map