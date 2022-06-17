import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { ListGroupView } from "../ListGroup/ListGroupView";
import { CardAlertView } from "./CardAlertView";
import { CardHeaderView } from "./CardHeaderView";
import { CardTitleHeaderView } from "./CardTitleHeaderView";

export class CardView extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('card');
    }

    addCardTitleHeader() {
        return this.addContent(new CardTitleHeaderView());
    }

    addCardHeader() {
        return this.addContent(new CardHeaderView());
    }

    addCardAlert() {
        return this.addContent(new CardAlertView());
    }

    addCardBody() {
        let body = this.addContent(new Block());
        body.addCssName('card-body');
        return body;
    }

    addBlockListGroup(createItemView: (source?: any) => IListItemView = null) {
        let listGroup = this.addContent(
            new ListGroupView(createItemView, new ListBlockViewModel())
        );
        listGroup.makeFlush();
        return listGroup;
    }

    addUnorderedListGroup(createItemView: (source?: any) => IListItemView = null) {
        let listGroup = this.addContent(
            new ListGroupView(createItemView)
        );
        listGroup.makeFlush();
        return listGroup;
    }
}