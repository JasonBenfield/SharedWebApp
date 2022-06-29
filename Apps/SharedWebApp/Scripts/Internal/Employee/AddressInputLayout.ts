import { ColumnCss } from "../../Lib/ColumnCss";
import { MarginCss } from "../../Lib/MarginCss";
import { PaddingCss } from "../../Lib/PaddingCss";
import { ComplexFieldFormGroupView } from "../../Lib/Views/ComplexFieldFormGroupView";
import { SimpleFieldFormGroupInputView } from "../../Lib/Views/FormGroup";
import { RowView } from "../../Lib/Views/RowView";
import { TextSpanView } from "../../Lib/Views/TextSpanView";
import { IFormGroupLayout } from "../../Lib/Views/Types";
import { IAddressInputFieldView } from "./AddressInputFieldView";

export class AddressInputLayout implements IFormGroupLayout<IAddressInputFieldView> {
    addFormGroups(view: ComplexFieldFormGroupView) {
        view.captionCell.setViewName('addressCaption');
        view.valueCell.setViewName('addressValue');
        const streetRow = view.valueCell.addView(RowView);
        streetRow.addCssName('g-0');
        streetRow.setMargin(MarginCss.bottom(3));
        const streetColumn = streetRow.addColumn();
        const line1 = streetColumn.addView(SimpleFieldFormGroupInputView);
        line1.captionCell.hide();
        line1.valueCell.removeCssName('grid-cell');
        const cityStateZipRow = view.valueCell.addView(RowView);
        cityStateZipRow.addCssName('g-0');
        const cityColumn = cityStateZipRow.addColumn();
        const city = cityColumn.addView(SimpleFieldFormGroupInputView);
        city.captionCell.hide();
        city.valueCell.removeCssName('grid-cell');
        const commaColumn = cityStateZipRow.addColumn();
        commaColumn.setColumnCss(ColumnCss.xs('auto'));
        commaColumn.setMargin(MarginCss.xs({ start: 1, end: 1 }));
        commaColumn.setPadding(PaddingCss.top(2));
        commaColumn.addView(TextSpanView).configure(ts => ts.setText(','));
        const stateColumn = cityStateZipRow.addColumn();
        stateColumn.setMargin(MarginCss.end(1));
        const state = stateColumn.addView(SimpleFieldFormGroupInputView);
        state.captionCell.hide();
        state.valueCell.removeCssName('grid-cell');
        const zipColumn = cityStateZipRow.addColumn();
        const zip = zipColumn.addView(SimpleFieldFormGroupInputView);
        zip.captionCell.hide();
        zip.valueCell.removeCssName('grid-cell');
        return {
            Line1: line1,
            City: city,
            State: state,
            Zip: zip
        };
    }
}