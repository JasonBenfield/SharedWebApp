﻿import { GridCellView } from "../Views/Grid";
import { ODataColumnView } from "./ODataColumnView";
import { FilterField } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";
import { ICreateDataCell, ICreateHeaderCell, IValueFormatter } from "./Types";

export class ODataColumn {
    constructor(
        readonly columnName: string,
        readonly displayText: string,
        readonly sourceType: SourceType,
        private readonly _createHeaderCell: ICreateHeaderCell,
        private readonly formatter: IValueFormatter,
        private readonly _createDataCell: ICreateDataCell,
        readonly isRequired: boolean,
        readonly isSelectable: boolean,
        readonly isVisible: boolean,
        readonly view: ODataColumnView
    ) {
    }

    toFilterField() { return new FilterField(this.columnName, this.displayText); }

    createHeaderCell(view: GridCellView) {
        return this._createHeaderCell(this, view);
    }

    createDataCell(rowIndex: number, record: any, view: GridCellView) {
        return this._createDataCell(rowIndex, this, record, this.formatter, view);
    }
}