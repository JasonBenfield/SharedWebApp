import { CardView } from "../../Shared/Card/CardView";
import { BlockViewModel } from "../../Shared/Html/BlockViewModel";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItemView } from "./TestListItemView";

export class TestCardView extends CardView {
    readonly cardTitleHeader = this.addCardTitleHeader();
    readonly alert = this.addCardAlert().alert;
    readonly testItems = this.addUnorderedListGroup(() => new TestListItemView());
    readonly clickableItems = this.addBlockListGroup(() => new TestClickableListItemView());

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
    }
}