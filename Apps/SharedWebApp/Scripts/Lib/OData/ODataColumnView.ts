import { GridCellView } from "../Html/GridCellView";
import { GridRowView } from "../Html/GridRowView";
import { GridTemplateCss } from "../Html/GridView";
import { ODataColumnStyle } from "./ODataColumnStyle";

export class ODataColumnView {
    constructor(
        readonly width: GridTemplateCss,
        readonly createHeaderCellView: (rowView: GridRowView, style?: ODataColumnStyle) => GridCellView,
        readonly createDataCellView: (rowView: GridRowView, style?: ODataColumnStyle) => GridCellView
    ) {
    }
}