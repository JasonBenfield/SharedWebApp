import { ContextualClass } from "../ContextualClass";
import { TextSpanView } from "../Html/TextSpanView";
import { ListGroupItemView } from "../ListGroup/ListGroupItemView";

export class ErrorListItemView extends ListGroupItemView {
    readonly message: TextSpanView;

    constructor() {
        super();
        this.addCssName('dropdown-item-text');
        this.addCssName(ContextualClass.danger.append('text'));
        this.message = this.addContent(new TextSpanView());
    }
}