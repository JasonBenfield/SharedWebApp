import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { TestListItemView } from "./TestListItemView";

export class TestListItem extends BasicComponent {
    constructor(i: number, view: TestListItemView) {
        super(view);
        new TextComponent(view.text).setText(`Item ${i}`);
    }
}