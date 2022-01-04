import { TextBlock } from "../../Shared/Html/TextBlock";
import { TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListItem {
    constructor(readonly i: number, view: TestClickableListItemView) {
        new TextBlock(`Clickable ${i}`, view.text);
    }
}