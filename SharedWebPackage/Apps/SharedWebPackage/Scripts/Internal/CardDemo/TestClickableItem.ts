import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { IListGroupFactory } from "../../Lib/Components/ListGroup";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { BasicListGroupItemView } from "../../Lib/Views/ListGroup";
import { TestClickableListFooterView, TestClickableListHeaderView, TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListFactory implements IListGroupFactory<TestClickableListItem, TestClickableListItemView> {
    createItem(i: number, itemView: TestClickableListItemView) {
        return new TestClickableListItem(i, itemView);
    }

    createHeader(headerView: BasicListGroupItemView) {
        return new TestClickableListHeader(headerView as TestClickableListHeaderView);
    }

    createFooter(footerView: BasicListGroupItemView) {
        return new TestClickableListFooter(footerView as TestClickableListFooterView);
    }
}

export class TestClickableListHeader extends BasicComponent {
    constructor(view: TestClickableListHeaderView) {
        super(view);
    }
}

export class TestClickableListFooter extends BasicComponent {
    constructor(view: TestClickableListFooterView) {
        super(view);
    }
}

export class TestClickableListItem extends BasicComponent {
    constructor(readonly i: number, view: TestClickableListItemView) {
        super(view);
        new TextComponent(view.text).setText(`Clickable ${i}`);
    }
}