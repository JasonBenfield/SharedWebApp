import { ListItem } from "../../Lib/Html/ListItem";
import { TextBlock } from "../../Lib/Html/TextBlock";
import { TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListItem extends ListItem {
    constructor(readonly i: number, view: TestClickableListItemView) {
        super(view);
        new TextBlock(`Clickable ${i}`, view.text);
    }
}