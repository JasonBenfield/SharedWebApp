import { ContextualClass } from "../ContextualClass";
import { TextBlockView } from "../Html/TextBlockView";
import { ListGroupItemView } from "../ListGroup/ListGroupItemView";

export class SelectFieldListItemView extends ListGroupItemView {
    constructor() {
        super();
        this.fieldName = this.addContent(new TextBlockView());
    }

    readonly fieldName: ITextComponentView;

    select() {
        this.setContext(ContextualClass.primary);
    }

    unselect() {
        this.setContext(ContextualClass.default);
    }
}