import { ContextualClass } from "../ContextualClass";
import { TextSpan } from "../Html/TextSpan";
import { ListGroupItemView } from "../ListGroup/ListGroupItemView";

export class ErrorListItemView extends ListGroupItemView {
    private readonly message: TextSpan;

    constructor() {
        super();
        this.addCssName('dropdown-item-text');
        this.addCssName(ContextualClass.danger.append('text'));
        this.message = this.addContent(new TextSpan());
    }

    setMessage(message: string) {
        this.message.setText(message);
    }
}