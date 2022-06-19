import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { Column } from "../Grid/Column";
import { Row } from "../Grid/Row";
import { Block } from "../Html/Block";
import { GridCellView } from "../Html/GridCellView";
import { GridCellViewModel } from "../Html/GridCellViewModel";
import { GridRowView } from "../Html/GridRowView";
import { TextBlockView } from "../Html/TextBlockView";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";

export class ODataHeaderCellView extends GridCellView {
    constructor(rowView: GridRowView, vm?: GridCellViewModel) {
        super(rowView, vm);
        this.stickyAtTop();
        const row = this.addContent(new Row());
        row.addCssName('gx-0');
        const col1 = row.addColumn();
        col1.setTextCss(new TextCss().truncate());
        this.columnName = col1.addContent(new TextBlockView());
        this.sortCol = row.addColumn();
        this.sortCol.setColumnCss(ColumnCss.xs('auto'));
        this.sortCol.addCssName('sort-button-not-set');
        this.sortButton = this.sortCol.addContent(new ButtonCommandItem());
        this.sortButton.icon.solidStyle('caret-up');
        this.sortButton.setPadding(PaddingCss.xs({ top: 0, end: 0 }));
    }

    readonly columnName: ITextComponentView;
    private readonly sortCol: Column;
    readonly sortButton: ButtonCommandItem;

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
}