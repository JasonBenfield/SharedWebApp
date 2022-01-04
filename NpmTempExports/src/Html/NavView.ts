import { FlexCss } from "../FlexCss";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { NavLinkView } from "./NavLinkView";
import { NavViewModel } from "./NavViewModel";

export class NavView extends HtmlContainerComponent {
    protected readonly vm: NavViewModel;
    private flexCss: FlexCss;

    constructor(vm: NavViewModel = new NavViewModel()) {
        super(vm);
        this.addCssName('nav');
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

    addLink() {
        let link = this.addContent(new NavLinkView());
        return link;
    }
}