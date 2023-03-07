import { DelayedAction } from '../../Lib/DelayedAction';
import { EnumerableRange } from "../../Lib/Enumerable";
import { ListGroup } from "../../Lib/Components/ListGroup";
import { CardAlert } from "../../Lib/Components/CardAlert";
import { TestCardView } from "./TestCardView";
import { TestClickableListItem } from "./TestClickableItem";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItem } from "./TestListItem";
import { TestListItemView } from "./TestListItemView";
import { TextComponent } from '../../Lib/Components/TextComponent';
import { TextAreaControl } from '../../Lib/Components/TextAreaControl';
import { MessageAlert } from '../../Lib/Components/MessageAlert';
import { TestGridListItem } from './TestGridListItem';
import { TestGridListItemView } from './TestGridListItemView';

export class TestCard {
    private readonly cardTitleHeader: TextComponent;
    private readonly alert: MessageAlert;
    private readonly testItems: ListGroup<TestListItem, TestListItemView>;
    private readonly clickableItems: ListGroup<TestClickableListItem, TestClickableListItemView>;
    private readonly gridItems: ListGroup<TestGridListItem, TestGridListItemView>;
    private readonly textArea: TextAreaControl;

    constructor(private readonly view: TestCardView) {
        this.cardTitleHeader = new TextComponent(this.view.cardTitleHeader);
        this.cardTitleHeader.setText('This is the Title');
        this.alert = new CardAlert(this.view.alert).alert;
        new TextComponent(view.manualItem).setText('Test List Item');
        this.testItems = new ListGroup(this.view.testItems);
        this.clickableItems = new ListGroup(this.view.clickableItems);
        this.testItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => new TestListItem(i, listItem)
        );
        this.testItems.addItem(6, (i: number, listItem: TestListItemView) => new TestListItem(i, listItem));
        this.clickableItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => new TestClickableListItem(i, listItem)
        );
        this.clickableItems.registerItemClicked(this.onClick.bind(this));
        this.gridItems = new ListGroup(view.gridItems);
        this.gridItems.setItems(
            new EnumerableRange(1, 5).value(),
            (i, listItem) => new TestGridListItem(i, listItem)
        );
        this.textArea = new TextAreaControl(view.textArea);
        this.textArea.when.valueChanged.then(this.onTextAreaValueChanged.bind(this));
    }

    private onTextAreaValueChanged(value: string) {
        alert(`textArea value ${value}`);
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