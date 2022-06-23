import { FlexCss } from "../FlexCss";
import { NavLinkView } from "../Html/NavLinkView";
import { NavView } from "../Html/NavView";
import { TextBlockView } from "../Html/TextBlockView";
import { TextHeading1View } from "../Html/TextHeading1View";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterAppendPanelView extends ModalODataPanelView {
    readonly title: ITextComponentView;
    readonly clearItem: NavLinkView;
    readonly appendItem: NavLinkView;

    constructor() {
        super();
        this.title = this.header.addContent(new TextHeading1View());
        const nav = this.body.addContent(new NavView());
        nav.pills();
        nav.setFlexCss(new FlexCss().column());
        this.clearItem = nav.addLink();
        this.clearItem.addContent(new TextBlockView())
            .configure(tb => tb.setText('Replace Filter'));
        this.appendItem = nav.addLink();
        this.appendItem.addContent(new TextBlockView())
            .configure(tb => tb.setText('Append to Filter'));
    }
}