"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorListItemView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../ColumnCss");
var Row_1 = require("../Grid/Row");
var TextBlockView_1 = require("../Html/TextBlockView");
var LinkListGroupItemView_1 = require("../ListGroup/LinkListGroupItemView");
var LinkListItemViewModel_1 = require("../ListGroup/LinkListItemViewModel");
var ModalErrorListItemView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalErrorListItemView, _super);
    function ModalErrorListItemView() {
        var _this = _super.call(this, new LinkListItemViewModel_1.LinkListItemViewModel()) || this;
        var row = _this.addContent(new Row_1.Row());
        _this.captionCol = row.addColumn();
        _this.captionCol.setColumnCss(ColumnCss_1.ColumnCss.xs(3));
        _this.caption = _this.captionCol.addContent(new TextBlockView_1.TextBlockView());
        var col2 = row.addColumn();
        _this.message = col2.addContent(new TextBlockView_1.TextBlockView());
        return _this;
    }
    ModalErrorListItemView.prototype.hideCaption = function () { this.captionCol.hide(); };
    ModalErrorListItemView.prototype.showCaption = function () { this.captionCol.show(); };
    return ModalErrorListItemView;
}(LinkListGroupItemView_1.LinkListGroupItemView));
exports.ModalErrorListItemView = ModalErrorListItemView;
//# sourceMappingURL=ModalErrorListItemView.js.map