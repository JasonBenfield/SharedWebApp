import { GridTemplateCss } from "../Html/GridView";
import { ODataColumnLayouts } from "./ODataColumnLayouts";

export class ODataColumnView {
    constructor(
        readonly width: GridTemplateCss,
        readonly layouts: ODataColumnLayouts
    ) {
    }
}