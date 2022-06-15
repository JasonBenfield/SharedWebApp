import { ListItem } from "../../Shared/Html/ListItem";
import { TextBlock } from "../../Shared/Html/TextBlock";
import { TestListItemView } from "./TestListItemView";

export class TestListItem extends ListItem {
    constructor(i: number, view: TestListItemView) {
        super(view);
        new TextBlock(`Item ${i}`, view.text);
    }
}