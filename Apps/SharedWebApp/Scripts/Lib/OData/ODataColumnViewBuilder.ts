import { CssLengthUnit } from "../Html/CssLengthUnit";
import { GridCellView } from "../Html/GridCellView";
import { GridRowView } from "../Html/GridRowView";
import { GridTemplateCss, GridTemplateFitContent, GridTemplateMinMax } from "../Html/GridView";
import { ODataColumnStyle } from "./ODataColumnStyle";
import { ODataColumnView } from "./ODataColumnView";
import { ODataHeaderCellView } from "./ODataHeaderCellView";
import { ODataTextCellView } from "./ODataTextCellView";
import { ICellStyle } from "./Types";

export class ODataColumnViewBuilder {
    private width: GridTemplateCss = new GridTemplateFitContent(CssLengthUnit.px(200));
    private headerCellStyle: ICellStyle = {};
    private dataCellStyle: ICellStyle = {};
    private createHeaderCellView: (rowView: GridRowView) => GridCellView =
        (rowView: GridRowView) => new ODataHeaderCellView(rowView);
    private createDataCellView: (rowView: GridRowView) => GridCellView =
        (rowView: GridRowView) => new ODataTextCellView(rowView);

    setWidth(width: GridTemplateCss) {
        this.width = width;
        return this;
    }

    setCreateHeaderCellView(createHeaderCellView: (rowView: GridRowView) => GridCellView) {
        this.createHeaderCellView = createHeaderCellView;
        return this;
    }

    setCreateDataCellView(createDataCellView: (rowView: GridRowView) => GridCellView) {
        this.createDataCellView = createDataCellView;
        return this;
    }

    setHeaderCellStyle(style: ICellStyle) {
        this.headerCellStyle = style;
        return this;
    }

    setDataCellStyle(style: ICellStyle) {
        this.dataCellStyle = style;
        return this;
    }

    build() {
        const createHeaderCellView = this.createHeaderCellView;
        const createDataCellView = this.createDataCellView;
        return new ODataColumnView(
            this.width,
            (rowView: GridRowView) => {
                const cellView = createHeaderCellView(rowView);
                new ODataColumnStyle(this.headerCellStyle).apply(cellView);
                return cellView;
            },
            (rowView: GridRowView) => {
                const cellView = createDataCellView(rowView);
                new ODataColumnStyle(this.dataCellStyle).apply(cellView);
                return cellView;
            }
        );
    }
}