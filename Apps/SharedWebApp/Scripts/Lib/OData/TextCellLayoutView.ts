import { GridCellView } from "../Html/GridCellView";
import { TextBlockView } from "../Html/TextBlockView";

export class TextCellLayoutView {
    constructor(view: GridCellView) {
        this.value = view.addContent(new TextBlockView());
    }

    readonly value: ITextComponentView;
}