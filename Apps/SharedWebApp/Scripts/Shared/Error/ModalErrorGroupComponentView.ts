import { Block } from '../Html/Block';
import { BlockViewModel } from '../Html/BlockViewModel';
import { HorizontalRule } from '../Html/HorizontalRule';
import { ListBlockViewModel } from '../Html/ListBlockViewModel';
import { TextHeading4View } from '../Html/TextHeading4View';
import { ListGroupView } from '../ListGroup/ListGroupView';
import { ModalErrorListItemView } from './ModalErrorListItemView';

export class ModalErrorGroupComponentView extends Block {
    private readonly hr: HorizontalRule;
    readonly caption: TextHeading4View;
    readonly errors: ListGroupView;

    constructor() {
        super(new BlockViewModel());
        this.hr = this.addContent(new HorizontalRule());
        this.caption = this.addContent(new TextHeading4View());
        this.caption.addCssName('alert-heading');
        this.errors = this.addContent(new ListGroupView(() => new ModalErrorListItemView(), new ListBlockViewModel()));
    }

    showHR() { this.hr.show(); }

    hideHR() { this.hr.hide(); }
}