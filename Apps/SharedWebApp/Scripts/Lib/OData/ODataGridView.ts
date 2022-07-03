﻿import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MappedArray } from "../Enumerable";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { GridRowView, GridTemplateFitContent, GridView } from "../Views/Grid";
import { MessageAlertView } from "../Views/MessageAlertView";
import { ODataColumnView } from "./ODataColumnView";

export class ODataGridView extends GridView {
    constructor(container: BasicComponentView) {
        super(container);
        this.setViewName(ODataGridView.name);
        this.setMargin(MarginCss.xs(0));
    }

    handleClick(action: (view: BasicComponentView, element: HTMLElement) => void) {
        this.on('click')
            .select('.grid-cell,.odata-sort-button')
            .execute(action)
            .subscribe();
    }

    addHeaderRow(columns: ODataColumnView[]) {
        const row = this.addRow(GridRowView);
        row.setContext(ContextualClass.secondary);
        row.setTextCss(new TextCss().bold());
        for (const col of columns) {
            const cell = row.addCell(col.headerCellCtor);
            col.configureHeaderCell(cell);
        }
        return row;
    }

    addAlertRow() {
        const cell = this.addCell();
        cell.setGridColumn(1, -1);
        const alert = cell.addView(MessageAlertView);
        return alert;
    }

    addDataRow(columns: ODataColumnView[]) {
        const row = this.addRow();
        for (const col of columns) {
            const cell = row.addCell(col.dataCellCtor);
            col.configureDataCell(cell);
        }
        return row;
    }

    setSelectedTemplateColumns(columns: ODataColumnView[]) {
        const templateColumns = new MappedArray(
            columns,
            col => col.width
        ).value();
        this.setTemplateColumns(...templateColumns);
        let minWidth = 0;
        for (const column of columns) {
            if (column.width instanceof CssLengthUnit && column.width.unit === 'px') {
                minWidth += column.width.size;
            }
            else if (column.width instanceof GridTemplateFitContent && column.width.length.unit === 'px') {
                minWidth += column.width.length.size;
            }
            else {
                minWidth += 200;
            }
        }
        this.setMinWidth(CssLengthUnit.px(minWidth));
    }
}