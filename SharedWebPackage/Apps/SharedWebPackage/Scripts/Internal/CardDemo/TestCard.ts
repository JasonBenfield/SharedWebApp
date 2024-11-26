import { CardAlert } from "../../Lib/Components/CardAlert";
import { ListGroup } from "../../Lib/Components/ListGroup";
import { TextAreaControl } from '../../Lib/Components/TextAreaControl';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { IMessageAlert } from "../../Lib/Components/Types";
import { DelayedAction } from '../../Lib/DelayedAction';
import { EnumerableRange } from '../../Lib/EnumerableRange';
import { TestCardView } from "./TestCardView";
import { TestClickableListFactory, TestClickableListItem } from "./TestClickableItem";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestGridListItem } from './TestGridListItem';
import { TestGridListItemView } from './TestGridListItemView';
import { TestListItem } from "./TestListItem";
import { TestListItemView } from "./TestListItemView";

export class TestCard {
    private readonly cardTitleHeader: TextComponent;
    private readonly alert: IMessageAlert;
    private readonly testItems: ListGroup<TestListItem, TestListItemView>;
    private readonly clickableItems: ListGroup<TestClickableListItem, TestClickableListItemView>;
    private readonly gridItems: ListGroup<TestGridListItem, TestGridListItemView>;
    private readonly textArea: TextAreaControl;

    constructor(private readonly view: TestCardView) {
        this.cardTitleHeader = new TextComponent(this.view.cardTitleHeader);
        this.cardTitleHeader.setText('This is the Title');
        this.alert = new CardAlert(this.view.alert);
        new TextComponent(view.manualItem).setText('Test List Item');
        this.testItems = new ListGroup(this.view.testItems);
        this.testItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => new TestListItem(i, listItem)
        );
        this.testItems.addItem(6, (i: number, listItem: TestListItemView) => new TestListItem(i, listItem));
        this.clickableItems = new ListGroup(
            this.view.clickableItems,
            new TestClickableListFactory()
        );
        this.clickableItems.setItems(
            new EnumerableRange(1, 5).value()
        );
        this.clickableItems.when.itemClicked.then(this.onItemClicked.bind(this));
        this.clickableItems.when.headerClicked.then(this.onHeaderClicked.bind(this));
        this.clickableItems.when.footerClicked.then(this.onFooterClicked.bind(this));
        this.gridItems = new ListGroup(
            view.gridItems,
            {
                createItem: (i, itemView) => new TestGridListItem(i, itemView),
                createHeader: (headerView: TestGridListItemView) => TestGridListItem.header(headerView),
                createFooter: (footerView: TestGridListItemView) => TestGridListItem.footer(footerView)
            }
        );
        this.gridItems.setItems(new EnumerableRange(1, 5).value());
        this.textArea = new TextAreaControl(view.textArea);
        this.textArea.when.valueChanged.then(this.onTextAreaValueChanged.bind(this));
    }

    private onTextAreaValueChanged(value: string) {
        alert(`textArea value ${value}`);
    }

    private onHeaderClicked() {
        alert(`You clicked the header`);
    }

    private onItemClicked(listItem: TestClickableListItem) {
        alert(`You clicked ${listItem.i}`);
    }

    private onFooterClicked() {
        alert(`You clicked the footer`);
    }

    refresh() {
        return this.alert.infoAction(
            'Loading...',
            () => {
                this.testItems.setItems(
                    new EnumerableRange(6, 4).value(),
                    (i: number, listItem: TestListItemView) => new TestListItem(i, listItem)
                );
                this.clickableItems.setItems(
                    new EnumerableRange(10, 6).value(),
                    (i: number, listItem: TestClickableListItemView) => new TestClickableListItem(i, listItem)
                );
                return new DelayedAction(() => { }, 5000).execute();
            }
        );
    }
}