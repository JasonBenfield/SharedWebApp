import { ContextualClass } from '../../Lib/ContextualClass';
import { CssLengthUnit } from '../../Lib/CssLengthUnit';
import { MarginCss } from '../../Lib/MarginCss';
import { PaddingCss } from '../../Lib/PaddingCss';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { GridView } from '../../Lib/Views/Grid';
import { GridLinkListGroupView, GridListGroupView } from '../../Lib/Views/ListGroup';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { SharedPageView } from '../SharedPageView';
import { TestCard2View } from './TestCard2View';
import { TestCardView } from './TestCardView';
import { TestGridLinkListItemView } from './TestGridLinkListItemView';
import { TestGridListItemView } from './TestGridListItemView';

export class MainPageView extends SharedPageView {
    readonly heading: TextHeading1View;
    readonly testCard: TestCardView;
    readonly testCard2: TestCard2View;
    readonly gridItems: GridListGroupView<TestGridListItemView>;
    readonly gridLinkItems: GridLinkListGroupView<TestGridLinkListItemView>;
    readonly refreshButton: ButtonCommandView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor() {
        super();
        const grid = this.addView(GridView);
        grid.styleAsLayout();
        grid.setTemplateRows(CssLengthUnit.auto(), CssLengthUnit.flex(1), CssLengthUnit.auto());
        grid.height100();

        this.heading = grid.addCell()
            .addView(BlockView)
            .addView(TextHeading1View);

        const container = grid.addCell()
            .configure(c => {
                c.addCssName('container');
                c.addCssName('h-100');
            })
            .addView(BlockView)
            .configure(b => {
                b.height100();
                b.positionRelative();
            })
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.setBackgroundContext(ContextualClass.light);
                b.scrollable();
                b.setPadding(PaddingCss.xs(3));
            });
        this.testCard = container.addView(TestCardView);
        this.testCard.setMargin(MarginCss.bottom(3));
        this.testCard2 = container.addView(TestCard2View);
        this.testCard2.setMargin(MarginCss.bottom(3));
        this.gridItems = container.addGridListGroup(TestGridListItemView);
        this.gridItems.setTemplateColumns(
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1)
        );
        this.gridItems.setMargin(MarginCss.bottom(3));

        this.gridLinkItems = container.addGridLinkListGroup(TestGridLinkListItemView);
        this.gridLinkItems.setTemplateColumns(
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1)
        );
        this.gridLinkItems.setMargin(MarginCss.bottom(3));
        const toolbar = grid.addCell().addView(ToolbarView);
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.addCssName('bg-opacity-25');
        toolbar.setPadding(PaddingCss.xs(3));
        this.refreshButton = toolbar.columnStart.addView(ButtonCommandView);
        this.refreshButton.icon.solidStyle('sync-alt');
        this.refreshButton.setText('Refresh');
        this.refreshButton.setContext(ContextualClass.secondary);
        this.cancelButton = toolbar.columnEnd.addView(ButtonCommandView);
        this.cancelButton.icon.solidStyle('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.setContext(ContextualClass.danger);
        this.cancelButton.setMargin(MarginCss.end(3));
        this.saveButton = toolbar.columnEnd.addView(ButtonCommandView);
        this.saveButton.positionIconRight();
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.primary);
    }
}