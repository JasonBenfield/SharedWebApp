import { CssLengthUnit } from "../CssLengthUnit";
import { GridCellView, GridTemplateCss, GridTemplateFitContent } from "../Views/Grid";
import { ViewConstructor } from "../Views/Types";
import { ODataColumnView } from "./ODataColumnView";
import { ODataHeaderCellView } from "./ODataHeaderCellView";
import { ODataTextCellView } from "./ODataTextCellView";

export class ODataColumnViewBuilder {
    private width: GridTemplateCss = new GridTemplateFitContent(CssLengthUnit.px(200));
    private headerCellCtor: ViewConstructor<GridCellView> = ODataHeaderCellView;
    private configureHeaderCell: (cell: GridCellView) => void = () => { };
    private dataCellCtor: ViewConstructor<GridCellView> = ODataTextCellView;
    private configureDataCell: (cell: GridCellView) => void = () => { };

    setWidth(width: GridTemplateCss) {
        this.width = width;
        return this;
    }

    headerCell<TView extends GridCellView>(
        headerCellCtor: ViewConstructor<TView>,
        configureHeaderCell?: (cell: TView) => void
    ) {
        this.headerCellCtor = headerCellCtor;
        if (configureHeaderCell) {
            this.configureHeaderCell = configureHeaderCell;
        }
        return this;
    }

    dataCell<TView extends GridCellView>(
        dataCellCtor: ViewConstructor<TView>,
        configureDataCell?: (cell: TView) => void
    ) {
        this.dataCellCtor = dataCellCtor;
        if (configureDataCell) {
            this.configureDataCell = configureDataCell;
        }
        return this;
    }

    build() {
        return new ODataColumnView(
            this.width,
            this.headerCellCtor,
            this.configureHeaderCell,
            this.dataCellCtor,
            this.configureDataCell
        );
    }
}