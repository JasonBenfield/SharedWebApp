import { AsyncCommand } from '../../Lib/Components/Command';
import { ListGroup } from '../../Lib/Components/ListGroup';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { EnumerableRange } from '../../Lib/EnumerableRange';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { MainPageView } from './MainPageView';
import { TestCard } from './TestCard';
import { TestGridLinkListItem } from './TestGridLinkListItem';
import { TestGridLinkListItemView } from './TestGridLinkListItemView';
import { TestGridListItem } from './TestGridListItem';
import { TestGridListItemView } from './TestGridListItemView';

class MainPage extends SharedPage {
    protected readonly view: MainPageView;
    private readonly testCard: TestCard;
    private readonly gridItems: ListGroup<TestGridListItem, TestGridListItemView>;
    private readonly gridLinkItems: ListGroup<TestGridLinkListItem, TestGridLinkListItemView>;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Card Demo');
        this.testCard = new TestCard(this.view.testCard);
        this.gridItems = new ListGroup(this.view.gridItems);
        this.gridItems.setItems(
            new EnumerableRange(10, 3).value(),
            (i, listItem) => new TestGridListItem(i, listItem)
        );
        this.gridLinkItems = new ListGroup(this.view.gridLinkItems);
        this.gridLinkItems.setItems(
            new EnumerableRange(10, 3).value(),
            (i, listItem) => new TestGridLinkListItem(i, listItem)
        );
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