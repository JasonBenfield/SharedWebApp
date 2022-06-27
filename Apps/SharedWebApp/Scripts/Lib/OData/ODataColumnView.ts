import { GridCellView, GridTemplateCss } from "../Views/Grid";
import { ViewConstructor } from "../Views/Types";

export class ODataColumnView {
    constructor(
        readonly width: GridTemplateCss,
        readonly headerCellCtor: ViewConstructor<GridCellView>,
        readonly configureHeaderCell: (cell: GridCellView) => void,
        readonly dataCellCtor: ViewConstructor<GridCellView>,
        readonly configureDataCell: (cell: GridCellView) => void
    ) {
    }
}