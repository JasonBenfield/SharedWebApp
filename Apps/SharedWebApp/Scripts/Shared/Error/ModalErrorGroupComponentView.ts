import { Block } from '../Html/Block';
import { BlockViewModel } from '../Html/BlockViewModel';
import { HorizontalRule } from '../Html/HorizontalRule';
import { ListBlockViewModel } from '../Html/ListBlockViewModel';
import { TextHeading4 } from '../Html/TextHeading4';
import { ListGroupView } from '../ListGroup/ListGroupView';
import { ModalErrorListItemView } from './ModalErrorListItemView';

export class ModalErrorGroupComponentView extends Block {
    private readonly hr: HorizontalRule;
    private readonly caption: TextHeading4;
    readonly errors: ListGroupView;

    constructor() {
        super(new BlockViewModel());
        this.hr = this.addContent(new HorizontalRule());
        this.caption = this.addContent(new TextHeading4());
        this.caption.addCssName('alert-heading');
        this.errors = this.addContent(new ListGroupView(() => new ModalErrorListItemView(), new ListBlockViewModel()));
    }

    showHR() { this.hr.show(); }

    hideHR() { this.hr.hide(); }

    setCaption(caption: string) {
        this.caption.setText(caption);
    }
}