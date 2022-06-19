import { GridCellView } from "../Html/GridCellView";
import { GridCellViewModel } from "../Html/GridCellViewModel";
import { GridRowView } from "../Html/GridRowView";
import { TextBlockView } from "../Html/TextBlockView";
import { ODataColumnStyle } from "./ODataColumnStyle";

export class ODataTextCellView extends GridCellView {
    constructor(rowView: GridRowView, vm?: GridCellViewModel) {
        super(rowView, vm);
        this.value = this.addContent(new TextBlockView());
    }

    readonly value: ITextComponentView;
}