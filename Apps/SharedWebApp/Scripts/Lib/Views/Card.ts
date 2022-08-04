import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BlockView } from "./BlockView";
import { BasicListGroupItemView, BasicListGroupView, ButtonListGroupItemView, ButtonListGroupView, LinkListGroupItemView, LinkListGroupView, ListGroupItemView, ListGroupView } from "./ListGroup";
import { MessageAlertView } from "./MessageAlertView";
import { TextBlockView } from "./TextBlockView";
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

    addLinkListGroup(ctor?: ViewConstructor<LinkListGroupItemView>) {
        return this.addListGroup(LinkListGroupView, ctor || LinkListGroupItemView);
    }

    addButtonListGroup(ctor?: ViewConstructor<ButtonListGroupItemView>) {
        return this.addListGroup(ButtonListGroupView, ctor || ButtonListGroupItemView);
    }

    addUnorderedListGroup(ctor?: ViewConstructor<ListGroupItemView>) {
        return this.addListGroup(ListGroupView, ctor || ListGroupItemView);
    }

    private addListGroup<TView extends BasicListGroupView, TItemView extends BasicListGroupItemView>(
        ctor: ViewConstructor<TView>,
        itemCtor?: ViewConstructor<TItemView>
    ) {
        const listGroup = this.addView(ctor);
        listGroup.makeFlush();
        if (itemCtor) {
            listGroup.setItemViewType(itemCtor);
        }
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