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
    private isRequired = false;
    private isSelectable = true;
    private isVisible = true;
    private formatter: IValueFormatter = new DefaultValueFormatter();
    private createHeaderCell: ICreateHeaderCell =
        (column, view: ODataHeaderCellView) => new ODataHeaderCell(column, view);
    private createDataCell: ICreateDataCell =
        (rowIndex, column, record: any, formatter, view: ODataTextCellView) =>
            new ODataTextCell(rowIndex, column, record, formatter, view);

    constructor(
        readonly columnName: string,
        readonly sourceType: SourceType = SourceType.none,
        private readonly view: ODataColumnViewBuilder = new ODataColumnViewBuilder()
    ) {
    }

    require() {
        this.isRequired = true;
        return this;
    }

    disableSelect() {
        this.isSelectable = false;
        return this;
    }

    hide() {
        this.isVisible = false;
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
            this.sourceType,
            this.createHeaderCell,
            this.formatter,
            this.createDataCell,
            this.isRequired,
            this.isSelectable,
            this.isVisible,
            this.view.build()
        );
    }
}