import { CardAlert } from "../../Lib/Components/CardAlert";
import { ListGroup } from "../../Lib/Components/ListGroup";
import { TextAreaControl } from '../../Lib/Components/TextAreaControl';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { IMessageAlert } from "../../Lib/Components/Types";
import { DelayedAction } from '../../Lib/DelayedAction';
import { EnumerableRange } from '../../Lib/EnumerableRange';
import { TestCard2View } from "./TestCard2View";
import { TestCardView } from "./TestCardView";
import { TestClickableListFactory, TestClickableListItem } from "./TestClickableItem";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestGridListItem } from './TestGridListItem';
import { TestGridListItemView } from './TestGridListItemView';
import { TestListItem } from "./TestListItem";
import { TestListItemView } from "./TestListItemView";

export class TestCard2 {
    private readonly gridItems: ListGroup<TestGridListItem, TestGridListItemView>;

    constructor(private readonly view: TestCard2View) {
        this.gridItems = new ListGroup(
            view.gridItems,
            {
                createItem: (i, itemView) => new TestGridListItem(i, itemView),
                createHeader: (headerView: TestGridListItemView) => TestGridListItem.header(headerView),
                createFooter: (footerView: TestGridListItemView) => TestGridListItem.footer(footerView)
            }
        );
        this.gridItems.setItems(new EnumerableRange(1, 5).value());
    }
}