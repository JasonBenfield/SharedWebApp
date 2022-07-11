﻿import { DefaultValueFormatter } from "./DefaultValueFormatter";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataHeaderCellView } from "./ODataHeaderCellView";
import { ODataTextCell } from "./ODataTextCell";
import { ODataTextCellView } from "./ODataTextCellView";
import { SourceType } from "./SourceType";
import { ICreateDataCell, ICreateHeaderCell, IValueFormatter } from "./Types";

export class ODataColumnBuilder {
    private displayText;
    private canMove = true;
    private isRequired = false;
    private canSelect = true;
    private formatter: IValueFormatter = new DefaultValueFormatter();
    private createHeaderCell: ICreateHeaderCell =
        (column: ODataColumn, view: ODataHeaderCellView) => new ODataHeaderCell(column, view);
    private createDataCell: ICreateDataCell =
        (rowIndex: number, column: ODataColumn, record: any, formatter: IValueFormatter, view: ODataTextCellView) => {
            return new ODataTextCell(rowIndex, column, record, formatter, view);
        }
            

    constructor(
        readonly columnName: string,
        readonly sourceType: SourceType = SourceType.none,
        private readonly view: ODataColumnViewBuilder = new ODataColumnViewBuilder()
    ) {
        this.displayText = this.columnName;
    }

    setDisplayText(displayText: string) {
        this.displayText = displayText;
        return this;
    }

    disableMove() {
        this.canMove = false;
        return this;
    }

    require() {
        this.isRequired = true;
        return this;
    }

    disableSelect() {
        this.canSelect = false;
        return this;
    }

    setFormatter(formatter: IValueFormatter) {
        this.formatter = formatter;
        return this;
    }

    setCreateHeaderCell(createHeaderCell: ICreateHeaderCell) {
        this.createHeaderCell = createHeaderCell;
        return this;
    }

    setCreateDataCell(createDataCell: ICreateDataCell) {
        this.createDataCell = createDataCell;
        return this;
    }

    build() {
        return new ODataColumn(
            this.columnName,
            this.displayText,
            this.sourceType,
            this.createHeaderCell,
            this.formatter,
            this.createDataCell,
            this.canMove,
            this.isRequired,
            this.canSelect,
            this.view.build()
        );
    }
}