import { DelayedAction } from '../../Shared/DelayedAction';
import { EnumerableRange } from "../../Shared/Enumerable";
import { TextBlock } from "../../Shared/Html/TextBlock";
import { ListGroup } from "../../Shared/ListGroup/ListGroup";
import { CardAlert } from "../../Shared/Card/CardAlert";
import { TestCardView } from "./TestCardView";
import { TestClickableListItem } from "./TestClickableItem";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItem } from "./TestListItem";
import { TestListItemView } from "./TestListItemView";

export class TestCard {
    private readonly cardTitleHeader = new TextBlock('Original Title', this.view.cardTitleHeader);
    private readonly alert = new CardAlert(this.view.alert).alert;
    private readonly testItems: ListGroup;
    private readonly clickableItems: ListGroup;

    constructor(private readonly view: TestCardView) {
        this.cardTitleHeader.setText('This is the Title');
        this.testItems = new ListGroup(this.view.testItems);
        this.clickableItems = new ListGroup(this.view.clickableItems);
        this.testItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i: number, listItem: TestListItemView) => new TestListItem(i, listItem)
        );
        this.testItems.addItem(6, (i: number, listItem: TestListItemView) => new TestListItem(i, listItem));
        this.clickableItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i: number, listItem: TestClickableListItemView) => new TestClickableListItem(i, listItem)
        );
        this.clickableItems.itemClicked.register(this.onClick.bind(this));
    }

    private onClick(listItem: TestClickableListItem) {
        alert(`You clicked ${listItem.i}`);
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