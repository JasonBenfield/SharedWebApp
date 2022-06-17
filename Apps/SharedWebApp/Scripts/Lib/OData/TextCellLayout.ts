import { GridCellView } from "../Html/GridCellView";
import { TextBlock } from "../Html/TextBlock";
import { TextCellLayoutView } from "./TextCellLayoutView";
import { ICellLayout } from "./Types";

export class TextCellLayout implements ICellLayout {
    execute(cellView: GridCellView, value: any) {
        const view = new TextCellLayoutView(cellView);
        const text = value && value.toString ? value.toString() : '';
        new TextBlock(text, view.value).syncTitleWithText();
    }
}