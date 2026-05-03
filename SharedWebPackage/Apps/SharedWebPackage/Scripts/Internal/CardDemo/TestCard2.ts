import { ListGroup } from "../../Lib/Components/ListGroup";
import { EnumerableRange } from '../../Lib/EnumerableRange';
import { BasicListGroupItemView } from "../../Lib/Views/ListGroup";
import { TestCard2View } from "./TestCard2View";
import { TestGridListItem } from './TestGridListItem';
import { TestGridListItemView } from './TestGridListItemView';

export class TestCard2 {
    private readonly gridItems: ListGroup<TestGridListItem, TestGridListItemView>;

    constructor(view: TestCard2View) {
        this.gridItems = new ListGroup(
            view.gridItems,
            {
                createItem: (i, itemView) => new TestGridListItem(i, itemView),
                createHeader: (headerView: BasicListGroupItemView) => TestGridListItem.header(headerView as TestGridListItemView),
                createFooter: (footerView: BasicListGroupItemView) => TestGridListItem.footer(footerView as TestGridListItemView)
            }
        );
        this.gridItems.setItems(new EnumerableRange(1, 5).value());
    }
}