import { FlexCss } from "../FlexCss";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { NavLinkView } from "./NavLinkView";
import { NavViewModel } from "./NavViewModel";
import { TextNavLinkView } from "./TextNavLinkView";
import { ViewEvents } from "./ViewEvents";

export class NavView extends HtmlContainerComponent {
    protected readonly vm: NavViewModel;
    private flexCss: FlexCss;

    constructor(vm: NavViewModel = new NavViewModel()) {
        super(vm);
        this.addCssName('nav');
    }

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

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

    addTextLink<TLinkView extends TextNavLinkView>(
        create: () => TLinkView = () => new TextNavLinkView() as TLinkView
    ) {
        return this.addLink(create);
    }

    addTextLinks<TLinkView extends TextNavLinkView>(
        howMany: number,
        create: () => TLinkView = () => new TextNavLinkView() as TLinkView
    ) {
        return this.addLinks(howMany, create);
    }

    addLink<TLinkView extends NavLinkView>(
        create: () => TLinkView = () => new NavLinkView() as TLinkView
    ) {
        return this.addLinks(1, create)[0];
    }

    addLinks<TLinkView extends NavLinkView>(
        howMany: number,
        create: () => TLinkView = () => new NavLinkView() as TLinkView
    ) {
        const links: TLinkView[] = [];
        for (let i = 0; i < howMany; i++) {
            const link = this.addContent(create());
            links.push(link);
        }
        return links;
    }
}