import { PageFrame } from '../../Shared/PageFrame';
import { TestCard } from './TestCard';
import { FlexColumn } from '../../Shared/Html/FlexColumn';
import { FlexColumnFill } from '../../Shared/Html/FlexColumnFill';
import { Container } from '../../Shared/Html/Container';
import { Toolbar } from '../../Shared/Html/Toolbar';
import { Block } from '../../Shared/Html/Block';
import { Heading1 } from '../../Shared/Html/Heading1';
import { TextSpan } from '../../Shared/Html/TextSpan';
import { ButtonCommandItem } from '../../Shared/Command/ButtonCommandItem';
import { ContextualClass } from '../../Shared/ContextualClass';
import { PaddingCss } from '../../Shared/PaddingCss';
import { AsyncCommand } from '../../Shared/Command/AsyncCommand';
import { Startup } from 'xtistart';

class MainPage {
    constructor(private readonly page: PageFrame) {
        let flexColumn = this.page.addContent(new FlexColumn());
        flexColumn.addContent(new Block())
            .configure(b => {
                let container = b.addContent(new Container());
                let heading1 = container.addContent(new Heading1());
                heading1.addContent(new TextSpan('Card Demo'));
            });
        let fillRow = flexColumn.addContent(new FlexColumnFill());
        this.testCard = fillRow.container.addContent(new TestCard());
        let toolbar = flexColumn.addContent(new Toolbar());
        toolbar.setBackgroundContext(ContextualClass.secondary);
        toolbar.setPadding(PaddingCss.xs(3));
        let refreshCommand = new AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        let refreshButton = refreshCommand.add(
            toolbar.columnStart.addContent(new ButtonCommandItem())
        );
        refreshButton.icon.setName('sync-alt');
        refreshButton.setText('Refresh');
        refreshButton.useOutlineStyle();
        refreshButton.setContext(ContextualClass.light);
        let cancelButton = toolbar.columnEnd.addContent(new ButtonCommandItem());
        cancelButton.icon.setName('times');
        cancelButton.setText('Cancel');
        cancelButton.setContext(ContextualClass.danger);
        let saveButton = toolbar.columnEnd.addContent(new ButtonCommandItem());
        saveButton.icon.setName('check');
        saveButton.setText('Save');
        saveButton.useOutlineStyle();
        saveButton.setBackgroundContext(ContextualClass.light);
        saveButton.setContext(ContextualClass.primary);
    }

    private readonly testCard: TestCard;

    private refresh() {
        return this.testCard.refresh();
    }
}
new MainPage(new Startup().build());