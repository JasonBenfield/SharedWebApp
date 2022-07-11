import { ColumnCss } from "../ColumnCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ColumnView } from "../Views/ColumnView";
import { ButtonCommandView } from "../Views/Commands";
import { GridCellView, GridRowView } from "../Views/Grid";
import { RowView } from "../Views/RowView";
import { TextBlockView } from "../Views/TextBlockView";

export class ODataHeaderCellView extends GridCellView {
    readonly columnName: BasicTextComponentView;
    private readonly sortCol: ColumnView;
    readonly sortButton: ButtonCommandView;

    constructor(rowView: GridRowView) {
        super(rowView);
        this.stickyAtTop();
        this.addCssName('z-4');
        this.addCssName('grid-header');
        const row = this.addView(RowView);
        row.addCssName('gx-0');
        const col1 = row.addColumn();
        col1.setTextCss(new TextCss().truncate());
        this.columnName = col1.addView(TextBlockView);
        this.sortCol = row.addColumn();
        this.sortCol.setColumnCss(ColumnCss.xs('auto'));
        this.sortCol.addCssName('sort-button-not-set');
        this.sortButton = this.sortCol.addView(ButtonCommandView);
        this.sortButton.addCssName('odata-sort-button');
        this.sortButton.icon.solidStyle('caret-up');
        this.sortButton.setPadding(PaddingCss.xs({ top: 0, end: 0 }));
    }

    sortNotSet() {
        this.sortCol.addCssName('sort-button-not-set');
        this.sortButton.icon.solidStyle('caret-up');
    }

    sortDesc() {
        this.sortCol.removeCssName('sort-button-not-set');
        this.sortButton.icon.solidStyle('caret-down');
    }

    sortAsc() {
        this.sortCol.removeCssName('sort-button-not-set');
        this.sortButton.icon.solidStyle('caret-up');
    }

    styleAsDragStart() {
        this.addCssName('drag-start');
    }

    styleAsDragEnd() {
        this.removeCssName('drag-start');
    }

    styleAsDragOver() {
        this.addCssName('drag-over');
    }

    styleAsDragLeave() {
        this.removeCssName('drag-over');
    }
}