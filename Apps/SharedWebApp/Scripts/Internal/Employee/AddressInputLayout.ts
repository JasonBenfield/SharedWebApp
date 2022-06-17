import { ColumnCss } from "../../Lib/ColumnCss";
import { ComplexFieldLayout } from "../../Lib/Forms/ComplexFieldLayout";
import { Row } from "../../Lib/Grid/Row";
import { TextBlock } from "../../Lib/Html/TextBlock";
import { TextSpanView } from "../../Lib/Html/TextSpanView";
import { MarginCss } from "../../Lib/MarginCss";
import { PaddingCss } from "../../Lib/PaddingCss";
import { AddressInputFieldView } from "./AddressInputFieldView";

export class AddressInputLayout extends ComplexFieldLayout {
    constructor(complexField: AddressInputFieldView) {
        super(complexField);
    }

    protected executeLayout(addressInput: AddressInputFieldView) {
        let streetRow = addressInput.valueColumn.addContent(new Row());
        streetRow.setMargin(MarginCss.bottom(3));
        let streetColumn = streetRow.addColumn();
        streetColumn.addContent(addressInput.Line1.valueColumn);
        let cityStateZipRow = addressInput.valueColumn.addContent(new Row());
        cityStateZipRow.addCssName('g-0');
        let cityColumn = cityStateZipRow.addColumn();
        cityColumn.addContent(addressInput.City.valueColumn);
        let commaColumn = cityStateZipRow.addColumn();
        commaColumn.setColumnCss(ColumnCss.xs('auto'));
        commaColumn.setMargin(MarginCss.xs({ start:1, end:1 }));
        commaColumn.setPadding(PaddingCss.top(2));
        let separator = commaColumn.addContent(new TextSpanView());
        new TextBlock(',', separator);
        let stateColumn = cityStateZipRow.addColumn();
        stateColumn.setMargin(MarginCss.end(1));
        stateColumn.addContent(addressInput.State.valueColumn);
        let zipColumn = cityStateZipRow.addColumn();
        zipColumn.addContent(addressInput.Zip.valueColumn);
    }
}