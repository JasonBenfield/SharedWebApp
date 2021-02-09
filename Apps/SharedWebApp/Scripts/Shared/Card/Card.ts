import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { ListItemViewModel } from "../Html/ListItemViewModel";
import { ButtonListGroupItem } from "../ListGroup/ButtonListGroupItem";
import { ButtonListItemViewModel } from "../ListGroup/ButtonListItemViewModel";
import { LinkListGroupItem } from "../ListGroup/LinkListGroupItem";
import { LinkListItemViewModel } from "../ListGroup/LinkListItemViewModel";
import { ListGroupItem } from "../ListGroup/ListGroupItem";
import { CardAlert } from "./CardAlert";
import { CardBody } from "./CardBody";
import { CardButtonListGroup } from "./CardButtonListGroup";
import { CardHeader } from "./CardHeader";
import { CardLinkListGroup } from "./CardLinkListGroup";
import { CardListGroup } from "./CardListGroup";
import { CardTitleHeader } from "./CardTitleHeader";

export class Card extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('card');
    }

    addCardTitleHeader(title: string) {
        return this.addContent(new CardTitleHeader(title));
    }

    addCardHeader() {
        return this.addContent(new CardHeader());
    }

    addCardAlert() {
        return this.addContent(new CardAlert());
    }

    addCardBody() {
        return this.addContent(new CardBody());
    }

    addButtonListGroup(createItem: (itemVM: ButtonListItemViewModel) => ButtonListGroupItem = null) {
        return this.addContent(new CardButtonListGroup(createItem));
    }

    addLinkListGroup(createItem: (itemVM: LinkListItemViewModel) => LinkListGroupItem = null) {
        return this.addContent(new CardLinkListGroup(createItem));
    }

    addListGroup(createItem: (itemVM: ListItemViewModel) => ListGroupItem = null) {
        return this.addContent(new CardListGroup(createItem));
    }
}