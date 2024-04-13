import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { BlockWithTextView } from "./BlockWithTextView";
import { GridCellView, GridTemplateCss, GridTemplateCssValue } from "./Grid";
import { LinkWithTextView } from "./LinkWithTextView";
import { TextBlockView } from "./TextBlockView";
import { TextLinkView } from "./TextLinkView";
import { ViewConstructor } from "./Types";

export class SingleRowGridView extends BasicComponentView {
    private useDefaultColumns = true;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
        this.addCssName('grid-borderless');
        this.addCssName('grid-layout');
    }

    setAutoColumns(columns: GridTemplateCss) {
        this.setStyle(style => style['grid-auto-columns'] = columns.toString());
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        this.useDefaultColumns = false;
        this._setTemplateColumns(...columns);
    }

    private _setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...columns).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

    addTextBlock() {
        return this.addToCell(TextBlockView).valueView;
    }

    addBlockWithText() {
        return this.addToCell(BlockWithTextView).valueView;
    }

    addTextLink() {
        return this.addToCell(TextLinkView).valueView;
    }

    addLinkWithText() {
        return this.addToCell(LinkWithTextView).valueView;
    }

    addToCell<TView extends BasicComponentView>(valueCtor: ViewConstructor<TView>) {
        return this.addToDerivedCell(GridCellView, valueCtor);
    }

    addToDerivedCell<TCellView extends GridCellView, TView extends BasicComponentView>(
        cellCtor: ViewConstructor<TCellView>,
        valueCtor: ViewConstructor<TView>
    ) {
        const cellView = this.addCell(cellCtor);
        const valueView = cellView.addView(valueCtor);
        return { cellView: cellView, valueView: valueView };
    }

    private addCell<TCellView extends GridCellView>(ctor: ViewConstructor<TCellView>) {
        const cell = this.addView(ctor);
        if (this.useDefaultColumns) {
            this._setTemplateColumns(...this.getCells().map(_ => CssLengthUnit.flex(1)));
        }
        return cell;
    }

    cell(index: number) { return this.getViewByIndex(index) as GridCellView; }

    getCells() { return this.getViews() as GridCellView[]; }
}