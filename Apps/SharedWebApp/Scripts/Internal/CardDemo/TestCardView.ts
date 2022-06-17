import { CardAlertView } from "../../Lib/Card/CardAlertView";
import { CardTitleHeaderView } from "../../Lib/Card/CardTitleHeaderView";
import { CardView } from "../../Lib/Card/CardView";
import { BlockViewModel } from "../../Lib/Html/BlockViewModel";
import { TextBlockView } from "../../Lib/Html/TextBlockView";
import { BaseListView } from "../../Lib/ListGroup/BaseListView";
import { TestClickableListItemView } from "./TestClickableItemView";
import { TestListItemView } from "./TestListItemView";

export class TestCardView extends CardView {
    readonly cardTitleHeader: CardTitleHeaderView;
    readonly alert: CardAlertView;
    readonly manualItem: ITextComponentView;
    readonly testItems: BaseListView;
    readonly clickableItems: BaseListView;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.cardTitleHeader = this.addCardTitleHeader();
        this.alert = this.addCardAlert();
        let manualItems = this.addUnorderedListGroup();
        this.manualItem = manualItems.addListGroupItem()
            .addContent(new TextBlockView());
        this.testItems = this.addUnorderedListGroup(() => new TestListItemView());
        this.clickableItems = this.addBlockListGroup(() => new TestClickableListItemView());
    }
}