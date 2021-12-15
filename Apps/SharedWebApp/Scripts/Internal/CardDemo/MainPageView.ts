import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { ContextualClass } from '../../Shared/ContextualClass';
import { Block } from '../../Shared/Html/Block';
import { Container } from '../../Shared/Html/Container';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { Heading1 } from '../../Shared/Html/Heading1';
import { TextSpan } from '../../Shared/Html/TextSpan';
import { Toolbar } from '../../Shared/Html/Toolbar';
import { PaddingCss } from '../../Shared/PaddingCss';
import { PageFrame } from '../../Shared/PageFrame';
import { TestCardView } from './TestCardView';

export class MainPageView {
    readonly testCard: TestCardView;
    readonly refreshButton: ButtonCommandItem;
    readonly cancelButton: ButtonCommandItem;
    readonly saveButton: ButtonCommandItem;

    constructor(private readonly page: PageFrame) {
        let flexColumn = this.page.addContent(new FlexColumn());
        flexColumn.addContent(new Block())
            .configure(b => {
                let container = b.addContent(new Container());
                let heading1 = container.addContent(new Heading1());
                heading1.addContent(new TextSpan('Card Demo'));
            });
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