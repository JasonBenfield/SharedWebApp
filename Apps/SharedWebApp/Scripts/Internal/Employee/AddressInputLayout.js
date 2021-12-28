"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInputLayout = void 0;
var tslib_1 = require("tslib");
var ColumnCss_1 = require("../../Shared/ColumnCss");
var ComplexFieldLayout_1 = require("../../Shared/Forms/ComplexFieldLayout");
var Row_1 = require("../../Shared/Grid/Row");
var TextBlock_1 = require("../../Shared/Html/TextBlock");
var TextSpanView_1 = require("../../Shared/Html/TextSpanView");
var MarginCss_1 = require("../../Shared/MarginCss");
var PaddingCss_1 = require("../../Shared/PaddingCss");
var AddressInputLayout = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AddressInputLayout, _super);
    function AddressInputLayout(complexField) {
        return _super.call(this, complexField) || this;
    }
    AddressInputLayout.prototype.executeLayout = function (addressInput) {
        var streetRow = addressInput.valueColumn.addContent(new Row_1.Row());
        streetRow.setMargin(MarginCss_1.MarginCss.bottom(3));
        var streetColumn = streetRow.addColumn();
        streetColumn.addContent(addressInput.Line1.valueColumn);
        var cityStateZipRow = addressInput.valueColumn.addContent(new Row_1.Row());
        cityStateZipRow.addCssName('g-0');
        var cityColumn = cityStateZipRow.addColumn();
        cityColumn.addContent(addressInput.City.valueColumn);
        var commaColumn = cityStateZipRow.addColumn();
        commaColumn.setColumnCss(ColumnCss_1.ColumnCss.xs('auto'));
        commaColumn.setMargin(MarginCss_1.MarginCss.xs({ start: 1, end: 1 }));
        commaColumn.setPadding(PaddingCss_1.PaddingCss.top(2));
        var separator = commaColumn.addContent(new TextSpanView_1.TextSpanView());
        new TextBlock_1.TextBlock(',', separator);
        var stateColumn = cityStateZipRow.addColumn();
        stateColumn.setMargin(MarginCss_1.MarginCss.end(1));
        stateColumn.addContent(addressInput.State.valueColumn);
        var zipColumn = cityStateZipRow.addColumn();
        zipColumn.addContent(addressInput.Zip.valueColumn);
    };
    return AddressInputLayout;
}(ComplexFieldLayout_1.ComplexFieldLayout));
exports.AddressInputLayout = AddressInputLayout;
//# sourceMappingURL=AddressInputLayout.js.map