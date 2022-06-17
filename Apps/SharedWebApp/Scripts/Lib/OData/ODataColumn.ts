import { GridTemplateCss } from "../Html/GridView";
import { ICellLayout } from "./Types";

export class ODataColumn {
    constructor(
        readonly columnName: string,
        readonly sourceType: string,
        readonly width: GridTemplateCss,
        readonly headerCellLayout: ICellLayout,
        readonly dataCellLayout: ICellLayout
    ) {
    }
}