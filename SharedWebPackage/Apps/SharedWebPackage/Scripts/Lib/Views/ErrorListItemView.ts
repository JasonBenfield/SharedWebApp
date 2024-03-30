import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { GridListGroupItemView } from "./ListGroup";
import { TextSpanView } from "./TextSpanView";

export class ErrorListItemView extends GridListGroupItemView {
    readonly message: TextSpanView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('dropdown-item-text');
        this.addCssName(ContextualClass.danger.append('text'));
        this.message = this.addCell().addView(TextSpanView);
    }
}