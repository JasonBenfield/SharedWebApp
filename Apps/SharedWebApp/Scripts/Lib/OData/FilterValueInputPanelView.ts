import { TextHeading1View } from "../Html/TextHeading1View";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class FilterValueInputPanelView extends ModalODataPanelView {
    readonly title: ITextComponentView;

    constructor() {
        super();
        this.title = this.header.addContent(new TextHeading1View());
    }
}