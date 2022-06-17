import { ButtonCommandItem } from '../../Lib/Command/ButtonCommandItem';
import { ContextualClass } from '../../Lib/ContextualClass';
import { Container } from '../../Lib/Html/Container';
import { FlexColumn } from '../../Lib/Html/FlexColumn';
import { FlexColumnFill } from '../../Lib/Html/FlexColumnFill';
import { TextHeading1View } from '../../Lib/Html/TextHeading1View';
import { Toolbar } from '../../Lib/Html/Toolbar';
import { PaddingCss } from '../../Lib/PaddingCss';
import { PageFrameView } from '../../Lib/PageFrameView';
import { TestCardView } from './TestCardView';

export class MainPageView {
    readonly heading: TextHeading1View;
    readonly testCard: TestCardView;
    readonly refreshButton: ButtonCommandItem;
    readonly cancelButton: ButtonCommandItem;
    readonly saveButton: ButtonCommandItem;

    constructor(private readonly page: PageFrameView) {
        let flexColumn = this.page.addContent(new FlexColumn());
        this.heading = flexColumn
            .addContent(new Container())
            .addContent(new TextHeading1View());
        let fillRow = flexColumn.addContent(new FlexColumnFill());
        this.testCard = fillRow.container.addContent(new TestCardView());
        let toolbar = flexColumn.addContent(new Toolbar());
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
        this.refreshButton = toolbar.columnStart.addContent(new ButtonCommandItem());
        this.refreshButton.icon.setName('sync-alt');
        this.refreshButton.setText('Refresh');
        this.refreshButton.useOutlineStyle();
        this.refreshButton.setContext(ContextualClass.light);
        this.cancelButton = toolbar.columnEnd.addContent(new ButtonCommandItem());
        this.cancelButton.icon.setName('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.setContext(ContextualClass.danger);
        this.saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem());
        this.saveButton.icon.setName('check');
        this.saveButton.setText('Save');
        this.saveButton.useOutlineStyle();
        this.saveButton.setBackgroundContext(ContextualClass.light);
        this.saveButton.setContext(ContextualClass.primary);
    }
}