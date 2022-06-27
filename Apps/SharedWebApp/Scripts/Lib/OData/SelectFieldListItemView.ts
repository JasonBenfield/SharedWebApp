import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class SelectFieldListItemView extends ListGroupItemView {
    constructor(container: BasicComponentView) {
        super(container);
        this.fieldName = this.addView(TextBlockView);
    }

    readonly fieldName: BasicTextComponentView;

    select() {
        this.setContext(ContextualClass.primary);
    }

    unselect() {
        this.setContext(ContextualClass.default);
    }
}