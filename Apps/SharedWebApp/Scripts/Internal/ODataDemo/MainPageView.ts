import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { ODataComponentView } from '../../Lib/OData/ODataComponentView';
import { ODataTextCellView } from '../../Lib/OData/ODataTextCellView';
import { PaddingCss } from '../../Lib/PaddingCss';
import { TextCss } from '../../Lib/TextCss';
import { BasicPageView } from '../../Lib/Views/BasicPageView';
import { GridView } from '../../Lib/Views/Grid';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { ODataEmployeeColumnViewsBuilder } from './ODataEmployeeColumnsBuilder';

export class MainPageView extends BasicPageView {
    readonly heading: TextHeading1View;
    readonly odataComponentView: ODataComponentView;
    readonly columns: ODataEmployeeColumnViewsBuilder;

    constructor() {
        super();
        const layoutGrid = this.addView(GridView);
        layoutGrid.layout();
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

        this.odataComponentView = fillRow.addView(ODataComponentView);

        let toolbar = layoutGrid.addCell().addView(ToolbarView);
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
    }
}