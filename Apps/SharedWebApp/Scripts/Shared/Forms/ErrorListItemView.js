"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorListItemView = void 0;
var tslib_1 = require("tslib");
var ContextualClass_1 = require("../ContextualClass");
var TextSpan_1 = require("../Html/TextSpan");
var ListGroupItemView_1 = require("../ListGroup/ListGroupItemView");
var ErrorListItemView = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorListItemView, _super);
    function ErrorListItemView() {
        var _this = _super.call(this) || this;
        _this.addCssName('dropdown-item-text');
        _this.addCssName(ContextualClass_1.ContextualClass.danger.append('text'));
        _this.message = _this.addContent(new TextSpan_1.TextSpan());
        return _this;
    }
    ErrorListItemView.prototype.setMessage = function (message) {
        this.message.setText(message);
    };
    return ErrorListItemView;
}(ListGroupItemView_1.ListGroupItemView));
exports.ErrorListItemView = ErrorListItemView;
//# sourceMappingURL=ErrorListItemView.js.map