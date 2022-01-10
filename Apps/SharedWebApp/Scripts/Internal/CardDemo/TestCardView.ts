import { CardAlertView } from "../../Shared/Card/CardAlertView";
import { CardTitleHeaderView } from "../../Shared/Card/CardTitleHeaderView";
import { CardView } from "../../Shared/Card/CardView";
import { BlockViewModel } from "../../Shared/Html/BlockViewModel";
import { TextBlockView } from "../../Shared/Html/TextBlockView";
import { BaseListView } from "../../Shared/ListGroup/BaseListView";
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