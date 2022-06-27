import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ModalComponentView } from "../Views/Modal";
import { TextHeading1View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class FilterValueInputPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
    }
}