import { BorderCss } from "../BorderCss";
import { FlexCss } from "../FlexCss";
import { Position } from "../Position";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonListGroupItemView, ButtonListGroupView, GridLinkListGroupItemView, GridLinkListGroupView, GridListGroupItemView, GridListGroupView, LinkListGroupItemView, LinkListGroupView, ListGroupItemView, ListGroupView, TextButtonListGroupItemView } from "./ListGroup";
import { ViewConstructor } from "./Types";

export class BlockView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
    }

    height100() {
        this.addCssName('h-100');
    }

    setFlexCss(flexCss: FlexCss) {
        this.setCss('flex', flexCss);
    }

    setBorderCss(borderCss: BorderCss) {
        this.setCss('border', borderCss);
    }

    positionAbsoluteFill() {
        this.positionAbsolute(Position.fill());
    }

    scrollable() {
        this.addCssName('overflow-auto');
    }

    setRole(role: string) {
        this.setAttr(attr => attr.role = role);
    }

    addGridListGroup<TItemView extends GridListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        return GridListGroupView.addTo(this, itemCtor);
    }

    addGridLinkListGroup<TItemView extends GridLinkListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        return GridLinkListGroupView.addTo(this, itemCtor);
    }

    addLinkListGroup<TItemView extends LinkListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        return LinkListGroupView.addTo(this, itemCtor);
    }

    addButtonListGroup<TItemView extends (ButtonListGroupItemView | TextButtonListGroupItemView)>(itemCtor: ViewConstructor<TItemView>) {
        return ButtonListGroupView.addTo(this, itemCtor);
    }

    addListGroup<TItemView extends ListGroupItemView>(itemCtor: ViewConstructor<TItemView>) {
        return ListGroupView.addTo(this, itemCtor);
    }

    styleAsFormControl() {
        this.addCssName('form-control-text');
    }
}