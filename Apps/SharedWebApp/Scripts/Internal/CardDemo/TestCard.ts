﻿import { DelayedAction } from '../../Lib/DelayedAction';
import { EnumerableRange } from "../../Lib/Enumerable";
import { ListGroup } from "../../Lib/Components/ListGroup";
import { CardAlert } from "../../Lib/Components/CardAlert";
import { TestCardView } from "./TestCardView";
import { TestClickableListItem } from "./TestClickableItem";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItem } from "./TestListItem";
import { TestListItemView } from "./TestListItemView";
import { TextComponent } from '../../Lib/Components/TextComponent';
import { MessageAlert } from '../../Lib/Components/MessageAlert';

export class TestCard {
    private readonly cardTitleHeader: TextComponent;
    private readonly alert: MessageAlert;
    private readonly testItems: ListGroup;
    private readonly clickableItems: ListGroup;

    constructor(private readonly view: TestCardView) {
        this.cardTitleHeader = new TextComponent(this.view.cardTitleHeader);
        this.cardTitleHeader.setText('This is the Title');
        this.alert = new CardAlert(this.view.alert).alert;
        new TextComponent(view.manualItem).setText('Test List Item');
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
        this.clickableItems.registerItemClicked(this.onClick.bind(this));
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