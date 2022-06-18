import { GridCellView } from "../Html/GridCellView";
import { TextBlock } from "../Html/TextBlock";
import { ODataColumn } from "./ODataColumn";
import { DefaultTextCellFormatter } from "./DefaultTextCellFormatter";
import { TextCellLayoutView } from "./TextCellLayoutView";
import { ICellLayout, ITextCellFormatter } from "./Types";
import { ODataColumnStyle } from "./ODataColumnStyle";

export class TextCellLayout implements ICellLayout {
    constructor(
        private readonly formatter: ITextCellFormatter = new DefaultTextCellFormatter(),
        private readonly style = new ODataColumnStyle()
    ) {
    }

    execute(cellView: GridCellView, column: ODataColumn, record?: any) {
        const view = new TextCellLayoutView(cellView, this.style);
        const text = this.formatter.format(column, record);
        new TextBlock(text, view.value).syncTitleWithText();
    }
}