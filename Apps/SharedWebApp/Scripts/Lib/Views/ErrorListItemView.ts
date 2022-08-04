import { ContextualClass } from "../ContextualClass";
import { TextSpanView } from "./TextSpanView";
import { BasicComponentView } from "./BasicComponentView";
import { ListGroupItemView } from "./ListGroup";

export class ErrorListItemView extends ListGroupItemView {
    readonly message: TextSpanView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('dropdown-item-text');
        this.addCssName(ContextualClass.danger.append('text'));
        this.message = this.addView(TextSpanView);
    }
}