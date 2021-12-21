import { TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListItem {
    constructor(readonly i: number, view: TestClickableListItemView) {
        view.setText(`Clickable ${i}`);
    }
}