import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { ButtonListGroupItemView, ButtonListGroupView, GridListGroupItemView, GridListGroupView, LinkListGroupItemView, LinkListGroupView, ListGroupItemView, ListGroupView, TextButtonListGroupItemView } from "./ListGroup";
import { MessageAlertView } from "./MessageAlertView";
import { ViewConstructor } from "./Types";

export class CardView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('card');
    }

    addCardTitleHeader() {
        return this.addView(CardTitleHeaderView);
    }

    addCardHeader() {
        return this.addView(CardHeaderView);
    }

    addCardAlert() {
        return this.addView(CardAlertView);
    }

    addCardBody() {
        const body = this.addView(BlockView);
        body.addCssName('card-body');
        return body;
    }

    addGridListGroup<TItemView extends GridListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        const listGroup = GridListGroupView.addTo(this, itemCtor);
        listGroup.makeFlush();
        return listGroup;
    }

    addLinkListGroup<TItemView extends LinkListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        const listGroup = LinkListGroupView.addTo(this, itemCtor);
        listGroup.makeFlush();
        return listGroup;
    }

    addButtonListGroup<TItemView extends (ButtonListGroupItemView | TextButtonListGroupItemView)>(itemCtor: ViewConstructor<TItemView>) {
        const listGroup = ButtonListGroupView.addTo(this, itemCtor);
        listGroup.makeFlush();
        return listGroup;
    }

    addListGroup<TItemView extends ListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        const listGroup = ListGroupView.addTo(this, itemCtor);
        listGroup.makeFlush();
        return listGroup;
    }
}

export class CardAlertView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('card-body');
        this.hide();
    }

    readonly alert = this.addView(MessageAlertView);
}

export class CardHeaderView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('card-header');
    }
}

export class CardTitleHeaderView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('card-header');
    }
}