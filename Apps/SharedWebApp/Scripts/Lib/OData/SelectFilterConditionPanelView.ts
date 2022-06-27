import { FlexCss } from "../FlexCss";
import { ModalComponentView } from "../Views/Modal";
import { NavView } from "../Views/NavView";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterConditionPanelView extends ModalODataPanelView {
    readonly title: ITextComponentView;
    private readonly nav: NavView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.nav = this.body.addView(NavView);
        this.nav.addLink();
        this.nav.pills();
        this.nav.setFlexCss(new FlexCss().column());
    }

    addLink() {
        return this.nav.addTextLink();
    }
}