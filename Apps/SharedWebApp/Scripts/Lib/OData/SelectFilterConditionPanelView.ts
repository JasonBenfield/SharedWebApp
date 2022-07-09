import { ContextualClass } from "../ContextualClass";
import { FlexCss } from "../FlexCss";
import { TextCss } from "../TextCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Commands";
import { ModalComponentView } from "../Views/Modal";
import { NavView } from "../Views/NavView";
import { TextHeading1View } from "../Views/TextHeadings";
import { TextLinkView } from "../Views/TextLinkView";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterConditionPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    private readonly nav: NavView;
    readonly backButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        this.nav = this.body.addView(NavView);
        this.nav.addLink();
        this.nav.pills();
        this.nav.setFlexCss(new FlexCss().column());
        this.footer.setTextCss(new TextCss().start());
        this.footer.addCssName('w-100');
        this.backButton = this.footer.addView(ButtonCommandView);
        this.backButton.useOutlineStyle(ContextualClass.secondary);
        this.backButton.icon.solidStyle('caret-left');
        this.backButton.setText('Back');
    }

    handleClick(action: (element: HTMLElement) => void) {
        this.body.on('click').select('a').execute(action).subscribe();
    }

    addLink() {
        return this.nav.addTextLink();
    }
}