import { Startup } from '../../Shared/Startup';
import { AsyncCommand } from '../../Shared/Command/AsyncCommand';
import { PageFrameView } from '../../Shared/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { TestCard } from './TestCard';
import { TextBlock } from '../../Shared/Html/TextBlock';

class MainPage {
    private readonly testCard: TestCard;

    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('Card Demo', view.heading);
        this.testCard = new TestCard(view.testCard);
        let refreshCommand = new AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        refreshCommand.add(view.refreshButton);
    }

    private refresh() {
        return this.testCard.refresh();
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());