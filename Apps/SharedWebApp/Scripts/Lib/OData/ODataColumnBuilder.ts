import { CssLengthUnit } from "../Html/CssLengthUnit";
import { GridTemplateCss } from "../Html/GridView";
import { ODataColumn } from "./ODataColumn";
import { TextCellLayout } from "./TextCellLayout";

export class ODataColumnBuilder {
    private width: GridTemplateCss = CssLengthUnit.px(150);

    constructor(
        private readonly columnName: string,
        private readonly sourceType: string
    ) {
    }

    setWidth(width: GridTemplateCss) {
        this.width = width;
    }

    build() {
        return new ODataColumn(
            this.columnName,
            this.sourceType,
            this.width,
            new TextCellLayout(),
            new TextCellLayout()
        );
    }
}