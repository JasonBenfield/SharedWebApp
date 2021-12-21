"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestListItemView = void 0;
var tslib_1 = require("tslib");
var Row_1 = require("../../Shared/Grid/Row");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var ListGroupItemView_1 = require("../../Shared/ListGroup/ListGroupItemView");
var TestListItemView = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TestListItemView, _super);
    function TestListItemView() {
        var _this = _super.call(this) || this;
        var row = _this.addContent(new Row_1.Row());
        _this.text = row.addColumn().addContent(new TextBlock_1.TextBlock());
        return _this;
    }
    TestListItemView.prototype.setText = function (text) {
        this.text.setText(text);
    };
    return TestListItemView;
}(ListGroupItemView_1.ListGroupItemView));
exports.TestListItemView = TestListItemView;
//# sourceMappingURL=TestListItemView.js.map