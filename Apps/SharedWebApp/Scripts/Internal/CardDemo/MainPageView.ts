import { ContextualClass } from '../../Lib/ContextualClass';
import { FlexCss } from '../../Lib/FlexCss';
import { MarginCss } from '../../Lib/MarginCss';
import { PaddingCss } from '../../Lib/PaddingCss';
import { BasicPageView } from '../../Lib/Views/BasicPageView';
import { BlockView } from '../../Lib/Views/BlockView';
import { ButtonCommandView } from '../../Lib/Views/Command';
import { TextHeading1View } from '../../Lib/Views/TextHeadings';
import { ToolbarView } from '../../Lib/Views/ToolbarView';
import { TestCardView } from './TestCardView';

export class MainPageView extends BasicPageView {
    readonly heading: TextHeading1View;
    readonly testCard: TestCardView;
    readonly refreshButton: ButtonCommandView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor() {
        super();
        const flexColumn = this.addView(BlockView)
            .configure(c => {
                c.addCssName('container');
                c.setFlexCss(new FlexCss().column());
                c.height100();
                c.scrollable();
            });
        this.heading = flexColumn
            .addView(BlockView)
            .addView(TextHeading1View);
        let fillRow = flexColumn.addView(BlockView)
            .configure(r => r.setFlexCss(new FlexCss().fill()));
        this.testCard = fillRow.addView(TestCardView);
        let toolbar = flexColumn.addView(ToolbarView);
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
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.primary);
        this.saveButton.positionIconRight();
    }
}