import { TextComponent } from "../Components/TextComponent";
import { DefaultValueFormatter } from "./DefaultValueFormatter";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataTextCellView } from "./ODataTextCellView";
import { IValueFormatter } from "./Types";

export class ODataTextCell extends ODataCell {
    protected readonly view: ODataTextCellView;

    constructor(
        rowIndex: number,
        column: ODataColumn,
        record: any,
        formatter: IValueFormatter = new DefaultValueFormatter(),
        view: ODataTextCellView
    ) {
        super(rowIndex, column, record, view);
        const value = new TextComponent(view.value);
        const text = formatter.format(column, record);
        value.setText(text);
        value.setTitle(text);
    }
}