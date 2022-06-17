import { ListItem } from "../../Lib/Html/ListItem";
import { TextBlock } from "../../Lib/Html/TextBlock";
import { TestListItemView } from "./TestListItemView";

export class TestListItem extends ListItem {
    constructor(i: number, view: TestListItemView) {
        super(view);
        new TextBlock(`Item ${i}`, view.text);
    }
}