import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { TestClickableListItemView } from "./TestClickableItemView";

export class TestClickableListItem extends BasicComponent {
    constructor(readonly i: number, view: TestClickableListItemView) {
        super(view);
        new TextComponent(view.text).setText(`Clickable ${i}`);
    }
}