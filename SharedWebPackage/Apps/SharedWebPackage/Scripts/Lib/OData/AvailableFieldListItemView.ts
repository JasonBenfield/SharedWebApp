import { TextCss } from "../TextCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonListGroupItemView } from "../Views/ListGroup";
import { TextBlockView } from "../Views/TextBlockView";

export class AvailableFieldListItemView extends ButtonListGroupItemView {
    readonly fieldName: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setTextCss(new TextCss().start());
        this.fieldName = this.addView(TextBlockView);
    }
}