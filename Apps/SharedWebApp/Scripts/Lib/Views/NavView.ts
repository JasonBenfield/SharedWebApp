import { FlexCss } from "../FlexCss";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ButtonView } from "./ButtonView";
import { ButtonCommandView } from "./Command";
import { LinkView } from "./LinkView";
import { TextButtonView } from "./TextButtonView";
import { TextLinkView } from "./TextLinkView";
import { ViewConstructor } from "./Types";

export class NavView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'nav');
        this.addCssName('nav');
    }

    pills() {
        this.addCssName('nav-pills');
    }

    justified() {
        this.addCssName('nav-justified');
    }

    setFlexCss(flexCss: FlexCss) {
        this.setCss('flex', flexCss && flexCss.cssClass().toString());
    }

    addButton() {
        const link = this.addView(ButtonView);
        link.addCssName('nav-link');
        return link;
    }

    addTextButton() {
        const link = this.addView(TextButtonView);
        link.addCssName('nav-link');
        return link;
    }

    addButtonCommand() {
        const link = this.addView(ButtonCommandView);
        link.addCssName('nav-link');
        return link;
    }

    addTextLink<TLinkView extends TextLinkView>(ctor?: ViewConstructor<TLinkView>) {
        return this.addTextLinks(1, ctor)[0];
    }

    addTextLinks<TLinkView extends TextLinkView>(howMany: number, ctor?: ViewConstructor<TLinkView>) {
        return this.addLinkViews(howMany, ctor || TextLinkView);
    }

    addLink<TLinkView extends LinkView>(ctor?: ViewConstructor<TLinkView>) {
        return this.addLinks(1, ctor)[0];
    }

    addLinks<TLinkView extends LinkView>(howMany: number, ctor?: ViewConstructor<TLinkView>) {
        return this.addLinkViews(howMany, ctor || LinkView);
    }

    protected addLinkViews<TView extends BasicComponentView>(howMany: number, ctor: ViewConstructor<TView>) {
        const links: TView[] = [];
        for (let i = 0; i < howMany; i++) {
            const link = this.addView(ctor);
            link.addCssName('nav-link');
            links.push(link);
        }
        return links;
    }
}