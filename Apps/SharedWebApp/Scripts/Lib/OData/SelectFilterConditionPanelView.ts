import { FlexCss } from "../FlexCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ModalComponentView } from "../Views/Modal";
import { NavView } from "../Views/NavView";
import { TextHeading1View } from "../Views/TextHeadings";
import { TextLinkView } from "../Views/TextLinkView";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterConditionPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    private readonly nav: NavView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        this.nav = this.body.addView(NavView);
        this.nav.addLink();
        this.nav.pills();
        this.nav.setFlexCss(new FlexCss().column());
    }

    handleClick(action: (view: TextLinkView) => void) {
        this.body.on('click').select('a').execute(action).subscribe();
    }

    addLink() {
        return this.nav.addTextLink();
    }
}