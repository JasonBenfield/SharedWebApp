import { FlexCss } from "../FlexCss";
import { ModalComponentView } from "../Views/Modal";
import { LinkView } from "../Views/LinkView";
import { NavView } from "../Views/NavView";
import { TextBlockView } from "../Views/TextBlockView";
import { TextHeading1View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";

export class SelectFilterAppendPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    readonly clearItem: LinkView;
    readonly appendItem: LinkView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        const nav = this.body.addView(NavView);
        nav.pills();
        nav.setFlexCss(new FlexCss().column());
        this.clearItem = nav.addLink();
        this.clearItem.addView(TextBlockView)
            .configure(tb => tb.setText('Replace Filter'));
        this.appendItem = nav.addLink();
        this.appendItem.addView(TextBlockView)
            .configure(tb => tb.setText('Append to Filter'));
    }
}