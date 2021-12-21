"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestClickableListItemView = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var ContextualClass_1 = require("../../Shared/ContextualClass");
var Row_1 = require("../../Shared/Grid/Row");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var ButtonListGroupItemView_1 = require("../../Shared/ListGroup/ButtonListGroupItemView");
var ButtonListItemViewModel_1 = require("../../Shared/ListGroup/ButtonListItemViewModel");
var TestClickableListItemView = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TestClickableListItemView, _super);
    function TestClickableListItemView() {
        var _this = _super.call(this, new ButtonListItemViewModel_1.ButtonListItemViewModel()) || this;
        var row = _this.addContent(new Row_1.Row());
        var iconColumn = row.addIconColumn('thumbs-up', function (icon) {
            icon.makeFixedWidth();
            icon.setColor(ContextualClass_1.ContextualClass.success);
        });
        iconColumn.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
        _this.text = row.addColumn()
            .addContent(new TextBlock_1.TextBlock());
        return _this;
    }
    TestClickableListItemView.prototype.setText = function (text) {
        this.text.setText(text);
    };
    return TestClickableListItemView;
}(ButtonListGroupItemView_1.ButtonListGroupItemView));
exports.TestClickableListItemView = TestClickableListItemView;
//# sourceMappingURL=TestClickableItemView.js.map