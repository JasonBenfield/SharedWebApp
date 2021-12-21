import { Startup } from '../../Shared/Startup';
import { AsyncCommand } from '../../Shared/Command/AsyncCommand';
import { PageFrameView } from '../../Shared/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';
import { TestCard } from './TestCard';

class MainPage {
    private readonly view: MainPageView;
    private readonly testCard: TestCard;

    constructor(page: PageFrameView) {
        new DefaultPageContext().load();
        this.view = new MainPageView(page);
        this.testCard = new TestCard(this.view.testCard);
        let refreshCommand = new AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        refreshCommand.add(this.view.refreshButton);
    }

    private refresh() {
        return this.testCard.refresh();
    }
}
new MainPage(new Startup().build());