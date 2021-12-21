import { TestListItemView } from "./TestListItemView";

export class TestListItem {
    constructor(i: number, view: TestListItemView) {
        view.setText(`Clickable ${i}`);
    }
}