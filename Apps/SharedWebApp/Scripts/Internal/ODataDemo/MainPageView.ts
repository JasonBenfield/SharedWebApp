import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { ODataColumnViewBuilder } from '../../Lib/OData/ODataColumnViewBuilder';
import { ODataComponentView } from '../../Lib/OData/ODataComponentView';
import { ODataTextCellView } from '../../Lib/OData/ODataTextCellView';
import { PaddingCss } from '../../Lib/PaddingCss';
import { TextCss } from '../../Lib/TextCss';
import { GridView } from '../../Lib/Views/Grid';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { SharedPageView } from '../SharedPageView';
import { ODataButtonGroupCellView } from './ODataButtonGroupCellView';
import { ODataDropdownView } from './ODataDropdownView';
import { ODataEmployeeColumnViewsBuilder } from './ODataEmployeeColumnsBuilder';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly odataComponentView: ODataComponentView;
    readonly columns: ODataEmployeeColumnViewsBuilder;
    readonly btnGroupColumn: ODataColumnViewBuilder;
    readonly dropdownColumn: ODataColumnViewBuilder;

    constructor() {
        super();
        const layoutGrid = this.addView(GridView);
        layoutGrid.styleAsLayout();
        layoutGrid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        layoutGrid.height100();
        this.heading = layoutGrid
            .addCell()
            .configure(b => b.addCssName('container'))
            .addView(TextHeading1View);
        const fillRow = layoutGrid.addCell()
            .configure(b => {
                b.addCssName('container');
                b.setPadding(PaddingCss.xs(0));
                b.setBackgroundContext(ContextualClass.light);
            });

        this.columns = new ODataEmployeeColumnViewsBuilder();
        this.columns.Salary.dataCell(
            ODataTextCellView,
            cellView => {
                cellView.setTextCss(new TextCss().end());
            }
        );
        this.btnGroupColumn = new ODataColumnViewBuilder();
        this.btnGroupColumn.dataCell(ODataButtonGroupCellView);

        this.dropdownColumn = new ODataColumnViewBuilder();
        this.dropdownColumn.dataCell(ODataDropdownView);

        this.odataComponentView = fillRow.addView(ODataComponentView);
        this.odataComponentView.addToClickSelection('.editButton,.deleteButton,.warnButton,.highlightButton');

        const toolbar = layoutGrid.addCell().addView(ToolbarView);
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
    }

    isDeleteButton(element: HTMLElement) {
        return element.classList.contains('deleteButton')
    }

    isEditButton(element: HTMLElement) {
        return element.classList.contains('editButton')
    }

    isWarnButton(element: HTMLElement) {
        return element.classList.contains('warnButton')
    }

    isHighlightButton(element: HTMLElement) {
        return element.classList.contains('highlightButton')
    }
}