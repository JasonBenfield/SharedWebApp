import { FlexCss } from "../FlexCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { LinkView } from "../Views/LinkView";
import { ModalComponentView } from "../Views/Modal";
import { NavView } from "../Views/NavView";
import { TextHeading1View } from "../Views/TextHeadings";
import { TextLinkView } from "../Views/TextLinkView";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterAppendPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    readonly clearItem: TextLinkView;
    readonly appendItem: TextLinkView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        const nav = this.body.addView(NavView);
        nav.pills();
        nav.setFlexCss(new FlexCss().column());
        this.clearItem = nav.addTextLink();
        this.appendItem = nav.addTextLink();
    }

    handleClick(action: (view: LinkView) => void) {
        this.body.on('click').select('a').execute(action).subscribe();
    }
}