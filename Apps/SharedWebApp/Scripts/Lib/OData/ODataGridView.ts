import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicGridRowView, GridView } from "../Views/Grid";
import { MessageAlertView } from "../Views/MessageAlertView";
import { ODataColumnView } from "./ODataColumnView";

export class ODataGridView extends GridView {
    private _configureDataRow: (row: BasicGridRowView) => void = () => { };
    private clickSelection: string;

    constructor(container: BasicComponentView) {
        super(container);
        this.setViewName(ODataGridView.name);
        this.setMargin(MarginCss.xs(0));
    }

    configureDataRow(configureDataRow: (row: BasicGridRowView) => void) {
        this._configureDataRow = configureDataRow;
    }

    addToClickSelection(clickSelection: string) {
        this.clickSelection = clickSelection;
    }

    handleClick(action: (element: HTMLElement) => void) {
        let clickSelection = '.grid-cell,.odata-sort-button';
        if (this.clickSelection) {
            clickSelection += `,${this.clickSelection}`
        }
        this.on('click')
            .select(clickSelection)
            .execute(action)
            .subscribe();
    }

    addHeaderRow(columns: ODataColumnView[]) {
        const row = this.addRow();
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
        this._configureDataRow(row);
        for (const col of columns) {
            const cell = row.addCell(col.dataCellCtor);
            col.configureDataCell(cell);
        }
        return row;
    }

    setSelectedTemplateColumns(columns: ODataColumnView[]) {
        const templateColumns = columns.map(col => col.width);
        this.setTemplateColumns(...templateColumns);
    }

    resize() {
        this.setWidth(CssLengthUnit.px(4000));
        const rows = this.getRows();
        const totalWidth = rows[0] && rows[0].calculateTotalWidth();
        if (totalWidth) {
            this.setWidth(CssLengthUnit.px(totalWidth + 50));
        }
    }
}