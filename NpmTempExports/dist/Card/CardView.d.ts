import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { ListGroupView } from "../ListGroup/ListGroupView";
import { CardAlertView } from "./CardAlertView";
import { CardHeaderView } from "./CardHeaderView";
import { CardTitleHeaderView } from "./CardTitleHeaderView";
export declare class CardView extends Block {
    constructor(vm?: BlockViewModel);
    addCardTitleHeader(): CardTitleHeaderView;
    addCardHeader(): CardHeaderView;
    addCardAlert(): CardAlertView;
    addCardBody(): Block;
    addBlockListGroup(createItemView?: (source?: any) => IListItemView): ListGroupView;
    addUnorderedListGroup(createItemView?: (source?: any) => IListItemView): ListGroupView;
}
