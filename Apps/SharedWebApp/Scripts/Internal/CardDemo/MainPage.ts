import { AsyncCommand } from '../../Lib/Components/Command';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { MainPageView } from './MainPageView';
import { TestCard } from './TestCard';

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly testCard: TestCard;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Card Demo');
        this.testCard = new TestCard(this.view.testCard);
        let refreshCommand = new AsyncCommand(this.refresh.bind(this));
        refreshCommand.animateIconWhenInProgress('spin');
        refreshCommand.add(this.view.refreshButton);
    }

    private refresh() {
        return this.testCard.refresh();
    }
}
new DefaultPageContext().load();
new MainPage();