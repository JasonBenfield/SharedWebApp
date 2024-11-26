import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { IListGroupFactory } from "../../Lib/Components/ListGroup";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { TestClickableListFooterView, TestClickableListHeaderView, TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListFactory implements IListGroupFactory<TestClickableListItem, TestClickableListItemView> {
    createItem(i: number, itemView: TestClickableListItemView) {
        return new TestClickableListItem(i, itemView);
    }

    createHeader(headerView: TestClickableListHeaderView) {
        return new TestClickableListHeader(headerView);
    }

    createFooter(footerView: TestClickableListFooterView) {
        return new TestClickableListFooter(footerView);
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