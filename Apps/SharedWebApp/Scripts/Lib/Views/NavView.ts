import { FlexCss } from "../FlexCss";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { LinkView } from "./LinkView";
import { TextLinkView } from "./TextLinkView";
import { IContainerView, ViewConstructor } from "./Types";

export class NavView extends BasicContainerView {
    private flexCss: FlexCss;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'nav'));
    }

    pills() {
        this.addCssName('nav-pills');
    }

    justified() {
        this.addCssName('nav-justified');
    }

    setFlexCss(flexCss: FlexCss) {
        this.replaceCssName(
            this.flexCss && this.flexCss.cssClass().toString(),
            flexCss && flexCss.cssClass().toString()
        );
        this.flexCss = flexCss;
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