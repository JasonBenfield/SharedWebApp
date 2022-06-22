import { FlexCss } from "../FlexCss";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { NavLinkView } from "./NavLinkView";
import { NavViewModel } from "./NavViewModel";
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

    addLink() {
        return this.addContent(new NavLinkView());
    }
}