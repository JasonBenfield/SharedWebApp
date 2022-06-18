import { GridCellView } from "../Html/GridCellView";
import { TextBlockView } from "../Html/TextBlockView";
import { ODataColumnStyle } from "./ODataColumnStyle";

export class TextCellLayoutView {
    constructor(view: GridCellView, style: ODataColumnStyle) {
        style.apply(view);
        this.value = view.addContent(new TextBlockView());
    }

    readonly value: ITextComponentView;
}