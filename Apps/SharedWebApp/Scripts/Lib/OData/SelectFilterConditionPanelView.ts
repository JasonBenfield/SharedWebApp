import { FlexCss } from "../FlexCss";
import { NavView } from "../Html/NavView";
import { TextHeading1View } from "../Html/TextHeading1View";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterConditionPanelView extends ModalODataPanelView {
    readonly title: ITextComponentView;
    private readonly nav: NavView;

    constructor() {
        super();
        this.title = this.header.addContent(new TextHeading1View());
        this.nav = this.body.addContent(new NavView());
        this.nav.addLink
        this.nav.pills();
        this.nav.setFlexCss(new FlexCss().column());
    }

    addLink() {
        return this.nav.addTextLink();
    }
}