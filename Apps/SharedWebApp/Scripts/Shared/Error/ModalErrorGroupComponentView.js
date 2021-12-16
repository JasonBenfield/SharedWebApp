"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalErrorGroupComponentView = void 0;
var tslib_1 = require("tslib");
var Block_1 = require("../Html/Block");
var BlockViewModel_1 = require("../Html/BlockViewModel");
var HorizontalRule_1 = require("../Html/HorizontalRule");
var TextHeading4_1 = require("../Html/TextHeading4");
var ListGroupView_1 = require("../ListGroup/ListGroupView");
var ModalErrorListItemView_1 = require("./ModalErrorListItemView");
var ModalErrorGroupComponentView = /** @class */ (function (_super) {
    tslib_1.__extends(ModalErrorGroupComponentView, _super);
    function ModalErrorGroupComponentView() {
        var _this = _super.call(this, new BlockViewModel_1.BlockViewModel()) || this;
        _this.hr = _this.addContent(new HorizontalRule_1.HorizontalRule());
        _this.caption = _this.addContent(new TextHeading4_1.TextHeading4());
        _this.errors = _this.addContent(new ListGroupView_1.ListGroupView(function () { return new ModalErrorListItemView_1.ModalErrorListItemView(); }));
        return _this;
    }
    ModalErrorGroupComponentView.prototype.showHR = function () { this.hr.show(); };
    ModalErrorGroupComponentView.prototype.hideHR = function () { this.hr.hide(); };
    ModalErrorGroupComponentView.prototype.setCaption = function (caption) {
        this.caption.setText(caption);
    };
    return ModalErrorGroupComponentView;
}(Block_1.Block));
exports.ModalErrorGroupComponentView = ModalErrorGroupComponentView;
//# sourceMappingURL=ModalErrorGroupComponentView.js.map