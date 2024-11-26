import { BasicComponent } from "../../Lib/Components/BasicComponent";
import { ListGroupFooter } from "../../Lib/Components/ListGroupFooter";
import { ListGroupHeader } from "../../Lib/Components/ListGroupHeader";
import { TextComponent } from "../../Lib/Components/TextComponent";
import { TestGridListItemView } from "./TestGridListItemView";

export class TestGridListItem extends BasicComponent {

    static header(itemView: TestGridListItemView) {
        itemView.styleAsHeader();
        return new ListGroupHeader(itemView);
    }

    static footer(itemView: TestGridListItemView) {
        itemView.styleAsFooter();
        return new ListGroupFooter(itemView);
    }

    constructor(i: number, view: TestGridListItemView) {
        super(view);
        new TextComponent(view.cell1).setText(`Cell ${i}, 1`);
        new TextComponent(view.cell2).setText(`Cell ${i}, 2`);
        new TextComponent(view.cell3).setText(`Cell ${i}, 3`);
    }
}