import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { PaddingCss } from '../../Lib/PaddingCss';
import { GridView } from '../../Lib/Views/Grid';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { SharedPageView } from '../SharedPageView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly dataGrid: GridView;

    constructor() {
        super();
        const layoutGrid = this.addView(GridView);
        layoutGrid.layout();
        layoutGrid.height100();
        layoutGrid.setTemplateRows(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        this.heading = layoutGrid
            .addCell()
            .configure(b => b.addCssName('container'))
            .addView(TextHeading1View);
        const fillRow = layoutGrid.addCell();
        fillRow.scrollable();
        this.dataGrid = fillRow.addView(GridView);
        const toolbar = layoutGrid.addCell().addView(ToolbarView);
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
    }
}