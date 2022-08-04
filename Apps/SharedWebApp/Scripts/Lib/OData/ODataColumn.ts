import { GridCellView } from "../Views/Grid";
import { NumberValueFormatter } from "./NumberValueFormatter";
import { ODataColumnView } from "./ODataColumnView";
import { FilterField } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";
import { ICreateDataCell, ICreateHeaderCell, ISuggestedValueGetter, IValueFormatter } from "./Types";

export class ODataColumn {
    constructor(
        readonly columnName: string,
        readonly displayText: string,
        readonly sourceType: SourceType,
        private readonly _createHeaderCell: ICreateHeaderCell,
        private readonly formatter: IValueFormatter,
        private readonly _createDataCell: ICreateDataCell,
        readonly canMove: boolean,
        readonly isRequired: boolean,
        readonly canSelect: boolean,
        readonly canFilter: boolean,
        readonly canSort: boolean,
        readonly view: ODataColumnView,
        readonly suggestedValueGetter: ISuggestedValueGetter
    ) {
    }

    get numberFormat() {
        if (this.formatter instanceof NumberValueFormatter) {
            return this.formatter.formatString;
        }
        return '';
    }

    toFilterField() { return new FilterField(this.columnName, this.displayText); }

    createHeaderCell(view: GridCellView) {
        return this._createHeaderCell(this, view);
    }

    createDataCell(rowIndex: number, record: any, view: GridCellView) {
        return this._createDataCell(rowIndex, this, record, this.formatter, view);
    }
}