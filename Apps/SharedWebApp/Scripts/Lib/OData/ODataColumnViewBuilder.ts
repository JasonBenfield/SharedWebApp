import { CssLengthUnit } from "../Html/CssLengthUnit";
import { GridTemplateCss } from "../Html/GridView";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnLayouts } from "./ODataColumnLayouts";
import { ODataColumnView } from "./ODataColumnView";
import { SourceType } from "./SourceType";

export class ODataColumnViewBuilder {
    private width: GridTemplateCss = CssLengthUnit.px(150);
    readonly layouts = new ODataColumnLayouts();

    constructor() {
    }

    setWidth(width: GridTemplateCss) {
        this.width = width;
    }

    build() {
        return new ODataColumnView(
            this.width,
            this.layouts
        );
    }
}