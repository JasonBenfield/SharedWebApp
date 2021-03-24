import { ColumnCss } from "../../Shared/ColumnCss";
import { ComplexFieldLayout } from "../../Shared/Forms/ComplexFieldLayout";
import { Row } from "../../Shared/Grid/Row";
import { TextSpan } from "../../Shared/Html/TextSpan";
import { MarginCss } from "../../Shared/MarginCss";
import { PaddingCss } from "../../Shared/PaddingCss";
import { AddressInputField } from "./AddressInputField";

export class AddressInputLayout extends ComplexFieldLayout {
    constructor(complexField: AddressInputField) {
        super(complexField);
    }

    protected executeLayout(addressInput: AddressInputField) {
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
        commaColumn.addContent(new TextSpan(','));
        let stateColumn = cityStateZipRow.addColumn();
        stateColumn.setMargin(MarginCss.end(1));
        stateColumn.addContent(addressInput.State.valueColumn);
        let zipColumn = cityStateZipRow.addColumn();
        zipColumn.addContent(addressInput.Zip.valueColumn);
    }
}