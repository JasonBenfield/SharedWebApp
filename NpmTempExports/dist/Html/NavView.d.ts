import { FlexCss } from "../FlexCss";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { NavLinkView } from "./NavLinkView";
import { NavViewModel } from "./NavViewModel";
export declare class NavView extends HtmlContainerComponent {
    protected readonly vm: NavViewModel;
    private flexCss;
    constructor(vm?: NavViewModel);
    pills(): void;
    justified(): void;
    setFlexCss(flexCss: FlexCss): void;
    addLink(): NavLinkView;
}
