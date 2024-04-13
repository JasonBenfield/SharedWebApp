import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { ContextualClass } from "../../Lib/ContextualClass";
import { TestGridListItemView } from "./TestGridListItemView";

export class TestGridListItem extends BasicComponent {
    constructor(i: number, view: TestGridListItemView) {
        super(view);
        new TextComponent(view.cell1).setText(`Cell ${i}, 1`);
        new TextComponent(view.cell2).setText(`Cell ${i}, 2`);
        new TextComponent(view.cell3).setText(`Cell ${i}, 3`);
    }
}