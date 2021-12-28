import { TextBlock } from "../../Shared/Html/TextBlock";
import { TestListItemView } from "./TestListItemView";

export class TestListItem {
    constructor(i: number, view: TestListItemView) {
        new TextBlock(`Item ${i}`, view.text);
    }
}